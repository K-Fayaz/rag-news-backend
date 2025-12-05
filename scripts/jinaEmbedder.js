import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { qdrant, createEmbedding } from "../helper/jinaHelper.js";
import { readFileSync } from "fs";
const newsArticles = JSON.parse(readFileSync('./news_articles.json', 'utf8'));

const main = async () => {
    await qdrant.createCollection("newsArticles-2", {
        vectors: {
          size: 1024,
          distance: "Cosine"
        }
    });

    let index = 1;
    for (let news of newsArticles) {
        const embedding = await createEmbedding(news.content);
        await qdrant.upsert("newsArticles-2", {
            points: [
                {
                    vector: embedding,
                    payload: news,
                    id: index,
                }
            ]
        });
        index += 1;
        console.log("upserted: ", news.url);
    }
}

main().catch(console.error);