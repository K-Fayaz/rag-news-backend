import dotenv from "dotenv";
dotenv.config();
import express from "express";
import redisClient from "./redis/redisClient.js";
import cors from "cors";
const app = express();
import "./helper/jinaHelper.js";

// Routes
import chatRoutes from "./routes/chat.js"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:[
        'http://localhost:5173',
        'http://localhost:3000',
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

app.listen(8080, () => {
    console.log('listening');
});
