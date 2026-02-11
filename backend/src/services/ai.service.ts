import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateAIResponse = async (prompt: string): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: any) {
        console.warn("Primary Model Failed:", error.message);

        // Fallback logic for 429/503
        if (error.status === 503 || error.status === 429) {
            try {
                const fallback = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await fallback.generateContent(prompt);
                return result.response.text();
            } catch (fbError) {
                throw error; // Throw original error if fallback fails
            }
        }
        throw error;
    }
};
