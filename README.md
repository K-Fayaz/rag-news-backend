# AI News Assistant – Backend

## Architecture
<svg viewBox="0 0 900 1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
    <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#2563eb" />
    </marker>
    <marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
    </marker>
    <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#16a34a" />
    </marker>
    <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#9333ea" />
    </marker>
  </defs>
  
  <!-- Title -->
  <text x="450" y="40" font-size="26" font-weight="bold" text-anchor="middle" fill="#1a202c">
    News Chatbot RAG Architecture
  </text>
  
  <!-- AUTOMATION SECTION -->
  <rect x="50" y="80" width="800" height="160" fill="#f7fafc" stroke="#cbd5e0" stroke-width="2" rx="10"/>
  <text x="450" y="110" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d3748">
    🔄 Daily Automation (2 AM IST - Independent)
  </text>
  
  <!-- GitHub Actions -->
  <rect x="100" y="140" width="150" height="70" fill="#667eea" stroke="#764ba2" stroke-width="2" rx="8"/>
  <text x="175" y="170" font-size="15" font-weight="bold" text-anchor="middle" fill="white">GitHub Actions</text>
  <text x="175" y="190" font-size="13" text-anchor="middle" fill="white">Scheduled Workflow</text>
  
  <!-- Scrape -->
  <rect x="300" y="140" width="150" height="70" fill="#f093fb" stroke="#f5576c" stroke-width="2" rx="8"/>
  <text x="375" y="170" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Scrape News</text>
  <text x="375" y="190" font-size="13" text-anchor="middle" fill="white">100 Articles</text>
  
  <!-- Jina Embeddings -->
  <rect x="500" y="140" width="150" height="70" fill="#4facfe" stroke="#00f2fe" stroke-width="2" rx="8"/>
  <text x="575" y="170" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Jina AI</text>
  <text x="575" y="190" font-size="13" text-anchor="middle" fill="white">Embeddings</text>
  
  <!-- Qdrant Update -->
  <rect x="700" y="140" width="150" height="70" fill="#43e97b" stroke="#38f9d7" stroke-width="2" rx="8"/>
  <text x="775" y="170" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Qdrant</text>
  <text x="775" y="190" font-size="13" text-anchor="middle" fill="white">Update Vectors</text>
  
  <!-- Arrows for automation -->
  <line x1="250" y1="175" x2="298" y2="175" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
  <line x1="450" y1="175" x2="498" y2="175" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
  <line x1="650" y1="175" x2="698" y2="175" stroke="#333" stroke-width="3" marker-end="url(#arrowhead)"/>
  
  <!-- USER FLOW SECTION -->
  <rect x="50" y="300" width="800" height="600" fill="#f7fafc" stroke="#cbd5e0" stroke-width="2" rx="10"/>
  <text x="450" y="330" font-size="16" font-weight="bold" text-anchor="middle" fill="#2d3748">
    💬 User Query Flow
  </text>
  
  <!-- Row 1: Frontend, Backend, Jina -->
  <rect x="100" y="370" width="150" height="70" fill="#fa709a" stroke="#fee140" stroke-width="2" rx="8"/>
  <text x="175" y="400" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Frontend</text>
  <text x="175" y="420" font-size="12" text-anchor="middle" fill="white">React + SCSS (Vercel)</text>
  
  <rect x="375" y="370" width="150" height="70" fill="#667eea" stroke="#764ba2" stroke-width="2" rx="8"/>
  <text x="450" y="400" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Backend API</text>
  <text x="450" y="420" font-size="12" text-anchor="middle" fill="white">Express (Render)</text>
  
  <rect x="650" y="370" width="150" height="70" fill="#4facfe" stroke="#00f2fe" stroke-width="2" rx="8"/>
  <text x="725" y="400" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Jina AI</text>
  <text x="725" y="420" font-size="12" text-anchor="middle" fill="white">Query Embedding</text>
  
  <!-- Row 2: Qdrant -->
  <rect x="650" y="520" width="150" height="70" fill="#43e97b" stroke="#38f9d7" stroke-width="2" rx="8"/>
  <text x="725" y="550" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Qdrant</text>
  <text x="725" y="570" font-size="12" text-anchor="middle" fill="white">Vector Search</text>
  
  <!-- Row 3: Claude -->
  <rect x="375" y="670" width="150" height="70" fill="#f093fb" stroke="#f5576c" stroke-width="2" rx="8"/>
  <text x="450" y="700" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Claude AI</text>
  <text x="450" y="720" font-size="12" text-anchor="middle" fill="white">Generate Answer [1][2]</text>
  
  <!-- Row 4: Redis -->
  <rect x="100" y="670" width="150" height="70" fill="#43e97b" stroke="#38f9d7" stroke-width="2" rx="8"/>
  <text x="175" y="700" font-size="15" font-weight="bold" text-anchor="middle" fill="white">Redis Cloud</text>
  <text x="175" y="720" font-size="12" text-anchor="middle" fill="white">Sessions (24h TTL)</text>
  
  <!-- Query Flow (Blue) -->
  <!-- 1. Frontend to Backend -->
  <line x1="250" y1="405" x2="373" y2="405" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead-blue)"/>
  <text x="312" y="395" font-size="12" font-weight="bold" text-anchor="middle" fill="#2563eb">1. Query</text>
  
  <!-- 2. Backend to Jina -->
  <line x1="525" y1="405" x2="648" y2="405" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead-blue)"/>
  <text x="587" y="395" font-size="12" font-weight="bold" text-anchor="middle" fill="#2563eb">2. Embed</text>
  
  <!-- 3. Jina to Qdrant -->
  <line x1="725" y1="440" x2="725" y2="518" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead-blue)"/>
  <text x="750" y="480" font-size="12" font-weight="bold" fill="#2563eb">3. Search</text>
  
  <!-- 4. Qdrant to Backend -->
  <line x1="650" y1="555" x2="525" y2="440" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead-blue)"/>
  <text x="580" y="490" font-size="12" font-weight="bold" fill="#2563eb">4. Top 5</text>
  
  <!-- 5. Backend to Claude -->
  <line x1="450" y1="440" x2="450" y2="668" stroke="#2563eb" stroke-width="3" marker-end="url(#arrowhead-blue)"/>
  <text x="475" y="555" font-size="12" font-weight="bold" fill="#2563eb">5. Generate</text>
  
  <!-- Response Flow (Red) -->
  <!-- 6. Claude to Backend -->
  <line x1="420" y1="670" x2="420" y2="442" stroke="#dc2626" stroke-width="3" marker-end="url(#arrowhead-red)"/>
  <text x="395" y="555" font-size="12" font-weight="bold" text-anchor="end" fill="#dc2626">6. Answer</text>
  
  <!-- 8. Backend to Frontend -->
  <line x1="375" y1="420" x2="252" y2="420" stroke="#dc2626" stroke-width="3" marker-end="url(#arrowhead-red)"/>
  <text x="312" y="435" font-size="12" font-weight="bold" text-anchor="middle" fill="#dc2626">8. Response</text>
  
  <!-- Save Flow (Green) -->
  <!-- 7. Backend to Redis -->
  <line x1="375" y1="420" x2="252" y2="690" stroke="#16a34a" stroke-width="3" marker-end="url(#arrowhead-green)"/>
  <text x="300" y="550" font-size="12" font-weight="bold" fill="#16a34a">7. Save History</text>
  
  <!-- Fetch History Flow (Purple dashed) -->
  <line x1="175" y1="520" x2="175" y2="668" stroke="#9333ea" stroke-width="3" stroke-dasharray="8,5" marker-end="url(#arrowhead-purple)"/>
  <text x="200" y="595" font-size="12" font-weight="bold" fill="#9333ea">Fetch History</text>
  <text x="200" y="610" font-size="11" fill="#9333ea">(via Backend)</text>
  
  <!-- Legend -->
  <rect x="50" y="920" width="800" height="60" fill="#fff" stroke="#e2e8f0" stroke-width="1" rx="6"/>
  <text x="70" y="945" font-size="13" font-weight="bold" fill="#666">Legend:</text>
  
  <line x1="140" y1="940" x2="190" y2="940" stroke="#2563eb" stroke-width="3"/>
  <text x="200" y="945" font-size="12" fill="#666">Query Flow</text>
  
  <line x1="300" y1="940" x2="350" y2="940" stroke="#dc2626" stroke-width="3"/>
  <text x="360" y="945" font-size="12" fill="#666">Response</text>
  
  <line x1="450" y1="940" x2="500" y2="940" stroke="#16a34a" stroke-width="3"/>
  <text x="510" y="945" font-size="12" fill="#666">Save</text>
  
  <line x1="580" y1="940" x2="630" y2="940" stroke="#9333ea" stroke-width="3" stroke-dasharray="8,5"/>
  <text x="640" y="945" font-size="12" fill="#666">Fetch History (on load)</text>
</svg>

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

