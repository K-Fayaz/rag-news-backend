# AI News Assistant – Backend

Express server that powers the RAG-backed news assistant. It embeds user
queries with Jina, retrieves relevant articles from Qdrant, asks Gemini for a
grounded answer, and tracks per-session chat history in Redis.

## Stack
- Node.js (ESM), Express
- Redis for chat session history
- Qdrant vector database (REST client)
- Jina embeddings API
- Google Gemini (`@google/genai`)

## Prerequisites
- Node.js 18+
- Redis running locally at `redis://localhost:6379` (configurable in
  `redis/redisClient.js`)
- Qdrant endpoint + API key
- Jina API key
- Gemini API key

## Environment Variables
Create `server/.env` with:
```
JINA_API_KEY=...
QDRANT_API_KEY=...
QDRANT_ENDPOINT=https://<your-qdrant-endpoint>
GEMINI_API_KEY=...
```

## Install & Run
```bash
cd server
npm install
node index.js
```
The server listens on port `8080` by default.

## Vector Database Setup (`scripts/`)

Before running the server, you need to populate the Qdrant vector database with news articles. Two scripts must be run once to set up the vector database in the cloud:

### 1. `scripts/scraper.js`
Scrapes news articles from Reuters and saves them to `news_articles.json`.

- Fetches article URLs from Reuters sitemap
- Scrapes up to 50 articles (configurable via `maxArticles`)
- Extracts title, content, description, and published date
- Saves results to `news_articles.json` in the scripts directory

**Run once:**
```bash
cd server/scripts
node scraper.js
```

### 2. `scripts/jinaEmbedder.js`
Reads `news_articles.json`, creates embeddings using Jina API, and uploads them to Qdrant.

- Creates a Qdrant collection named `newsArticles` (1024-dimensional vectors, cosine distance)
- Generates embeddings for each article's content using Jina
- Upserts articles with their embeddings and metadata to Qdrant
- Requires `news_articles.json` to exist (created by scraper.js)

**Run once (after scraper.js):**
```bash
cd server/scripts
node jinaEmbedder.js
```

**Note:** Both scripts require the same environment variables as the main server (Jina API key, Qdrant endpoint + API key). Ensure `server/.env` is configured before running.

## API Routes (prefix `/api`)
- `POST /api/chat` → Start/continue a chat. Request body: `{ sessionId?, query }`.
- `GET /api/history/:sessionId` → Fetch stored chat turns for a session.
- `DELETE /api/session/:sessionId` → Delete a session’s history.
- `GET /ping-redis` → Connectivity check for Redis.

## Data Flow
1) `POST /api/chat`  
   - Accepts the user query and optional `sessionId` (generates one otherwise).
   - Retrieves session history from Redis and appends the user turn.
   - Creates an embedding for the query (Jina) and searches Qdrant collection
     `newsArticles-2` for top matches.
   - Builds a RAG prompt from those articles and calls Gemini for a response.
   - Appends the bot reply to history, saves it back to Redis, and sets a TTL.
2) History endpoints simply read or delete the Redis key.

## Controllers (`controllers/chat.js`)
- `newChatQuery(req, res)`  
  Orchestrates the full chat step: manages session ID and history, embeds the
  query, searches Qdrant, builds a prompt, calls Gemini, stores the new bot
  response, and returns `{ data, history, sessionId }`. Adds a welcome bot
  message if the session is new.

- `getSessionHistory(req, res)`  
  Reads `session:{sessionId}:history` from Redis and returns it. Rejects if no
  session ID is provided.

- `deleteSessionHistory(req, res)`  
  Deletes the Redis key for the given session and confirms removal. Used to
  reset/forget a conversation.

### Redis expiry in `newChatQuery`
After saving updated history:
```js
await redisClient.expire(redisKey, 86400);
```

## DEMO
https://drive.google.com/file/d/1SwE5udZZ7LYy9rqrhyvIjGNQTArvgOhV/view?usp=sharing

## Code Walkthrough
https://drive.google.com/file/d/1NNx6Om_ctVYRbsy2q12g3J3RaciOcv_c/view?usp=sharing

`expire` sets a TTL of `86400` seconds (24 hours) on the session key
`session:{sessionId}:history`. If the key already existed, the TTL is refreshed
each time a chat turn is saved. Once expired, Redis automatically removes the
history so idle sessions don’t accumulate.

