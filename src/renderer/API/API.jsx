import { GoogleGenAI } from "@google/genai";

async function makeAPICall(prompt) {
    const api = window.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({apiKey:api});

    let response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [prompt],
    config: {
        tools: [{ codeExecution: {} }],
    },
    });

    const parts = response?.candidates?.[0]?.content?.parts || [];
    parts.forEach((part) => {
        if (part.executableCode && part.executableCode.code) {
            return part.executableCode.code;
        }
    });
    return null;
}

export default makeAPICall;