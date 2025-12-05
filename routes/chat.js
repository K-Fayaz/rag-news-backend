import express from "express";
const router = express.Router();
import { newChatQuery, getSessionHistory, deleteSessionHistory } from "../controllers/chat.js";

router.post('/chat', newChatQuery);

router.get("/history/:sessionId", getSessionHistory);

router.delete("/session/:sessionId", deleteSessionHistory);

export default router;