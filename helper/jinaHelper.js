import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import axios from "axios";
import { QdrantClient } from '@qdrant/js-client-rest';

const API_KEY = process.env.JINA_API_KEY;
const url = "https://api.jina.ai/v1/embeddings";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const QDRANT_ENDPOINT = process.env.QDRANT_ENDPOINT;

const qdrant = new QdrantClient({
    url: QDRANT_ENDPOINT,
    apiKey: QDRANT_API_KEY,
});

const createEmbedding = async (text) => {
    try {
        const response = await axios.post(url,
            {
                model:"jina-embeddings-v3",
                input:text,
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        return response.data.data[0].embedding;
    }
    catch(error) {
        console.error("Error creating embedding:", error);
        throw error;
    }
};

export {
    qdrant,
    createEmbedding
}