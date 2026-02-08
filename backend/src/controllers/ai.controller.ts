import { Request, Response } from "express";
import { generateAIResponse } from "../services/ai.service";

export const getSuggestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text } = req.body;

        if (!text) {
            res.status(400).json({ message: "Missing text" });
            return;
        }

        const suggestion = await generateAIResponse(text);
        res.json({ suggestion });

    } catch (error: any) {
        console.error("AI Controller Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
