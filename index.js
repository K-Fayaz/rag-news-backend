import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redisClient from "./redis/redisClient.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
import "./helper/jinaHelper.js";

// Routes
import chatRoutes from "./routes/chat.js"

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:[
        'http://localhost:5173',
        'http://localhost:3000',
        "https://rag-news-client.vercel.app/"
    ]
}));

app.get("/ping-redis", async (req, res) => {
    try {
      await redisClient.set("test-key", "hello-redis");
      const value = await redisClient.get("test-key");
      res.json({ ok: true, value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, error: "Redis error" });
    }
  });

app.use('/api', chatRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('listening');
});
