import getPrompt from "../helper/prompts.js";
import callLLM  from "../helper/LLMCalls.js";
import { callAnthropic } from "../helper/LLMCalls.js";
import { v4 as uuid } from "uuid";
import redisClient from "../redis/redisClient.js";
import { qdrant, createEmbedding } from "../helper/jinaHelper.js";

const formatTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const newChatQuery = async (req,res) => {
    try {
        let { sessionId, query } = req.body;

        if (!sessionId) sessionId = uuid();

        const redisKey = `session:${sessionId}:history`;
        let history = await redisClient.get(redisKey);
        history = history ? JSON.parse(history) : [];
        
        if (history.length == 0) history.push({ id: 1, sender: "bot", text:"Welcome back! How can I help you today?", timestamp: formatTime(), });
        history.push({ id: history.length + 1, sender: "user", text:query, timestamp: formatTime() });

        
        let queryVector = await createEmbedding(query);
        const result = await qdrant.search("newsArticles", {
            vector: queryVector,
            limit: 5
        });

        let prompt = getPrompt(query, result);
        let response = await callAnthropic(prompt,{});

        history.push({ id: history.length + 1, sender: "bot", text:response, timestamp: formatTime() });

        await redisClient.set(redisKey, JSON.stringify(history));
        await redisClient.expire(redisKey, 86400);

        return res.status(200).json({
            status: true,
            data: response,
            history: history,
            sessionId: sessionId
        });
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

const getSessionHistory = async (req,res) => {
    try {
        let { sessionId } = req.params;

        if (!sessionId) return res.status(400).json({ status: false, message:"There is no session yet"});

        let redisKey = `session:${sessionId}:history`;
        let history = await redisClient.get(redisKey);

        return res.status(200).json({ status: true, history });

    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

const deleteSessionHistory = async (req, res) => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) return res.status(400).json({ status: false, message:"There is no session yet"});
      const redisKey = `session:${sessionId}:history`;
  
      await redisClient.del(redisKey);
  
      res.json({ success: true, message: "Session deleted successfully" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Delete session failed" });
    }
}

export {
    newChatQuery,
    getSessionHistory,
    deleteSessionHistory
}