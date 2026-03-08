import { GoogleGenAI } from "@google/genai";

async function makeAPICall(prompt) {
    // const api = window.env.GEMINI_3_API_KEY;
    const api = window.env.GEMINI_2_API_KEY;
    console.log(api);
    const ai = new GoogleGenAI({apiKey:api});

    let response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    // model: "gemini-3-flash-preview",
    contents: [prompt],
    config: {
        tools: [{ codeExecution: {} }],
    },
    });

    const parts = response?.candidates?.[0]?.content?.parts || [];

    // Gemini 2 Version
    return parts[0].text;

    // // Gemini 3 Version
    // parts.forEach((part) => {
    //     if (part.executableCode && part.executableCode.code) {
    //         console.log()
    //         return part.executableCode.code;
    //     }
    // });
    // return null;
}

export default makeAPICall;