import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { qdrant, createEmbedding } from "../helper/jinaHelper.js";

const pushEmbeddings = async (articles) => {
    
    await qdrant.deleteCollection("newsArticles");
    
    await qdrant.createCollection("newsArticles", {
        vectors: {
          size: 1024,
          distance: "Cosine"
        }
    });

    let index = 1;
    for (let news of articles) {
        const embedding = await createEmbedding(news.content);
        await qdrant.upsert("newsArticles", {
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

export default pushEmbeddings;