import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI} from '@google/genai';
import { Anthropic } from '@anthropic-ai/sdk';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const client = new Anthropic({
  apiKey: CLAUDE_API_KEY
});

async function callLLM(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-pro',
            contents: prompt,
        });
        
    
        return response.text;
    }
    catch(error) {
        console.error("Error creating embedding:", error);
        throw error;
    }
}

export async function callAnthropic(prompt, options = {}) {
    try {
        const stream = await client.messages.stream({
            max_tokens: 1024,
            messages: [{ role: 'user', content: prompt }],
            model: 'claude-sonnet-4-5-20250929',
        });

        let fullText = '';
        
        for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && 
                chunk.delta.type === 'text_delta') {
                fullText += chunk.delta.text;
                process.stdout.write(chunk.delta.text); // Real-time output
            }
        }

        return fullText;
    }
    catch(error) {
        console.error("Error calling Anthropic:", error);
        throw error;
    }
}

export default callLLM;