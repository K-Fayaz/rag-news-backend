import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function callLLM(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt,
        });
        
    
        return response.text;
    }
    catch(error) {
        console.error("Error creating embedding:", error);
        throw error;
    }
}

export default callLLM;