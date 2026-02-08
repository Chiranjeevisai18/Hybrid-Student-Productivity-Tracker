import * as functions from "firebase-functions/v2/https";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

export const suggest = functions.onRequest({ cors: true }, async (req, res): Promise<void> => {
  try {
    const body = req.body;

    if (!body || !body.text) {
      res.status(400).json({ error: "Missing 'text' in request body" });
      return;
    }

    const text = body.text;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: "GEMINI_API_KEY missing in .env" });
      return;
    }

    // Initialize with API key using stable SDK
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
      // Primary Model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(text);
      const responseText = result.response.text();

      res.json({ suggestion: responseText });

    } catch (primaryError: any) {
      console.warn("Primary Model Failed:", primaryError.message);

      // Check for 429 (Quota) or 503 (Overloaded)
      const status = primaryError.status || (primaryError.response ? primaryError.response.status : 500);

      if (status === 429 || status === 503) {
        console.log("Switching to Fallback Model (gemini-1.5-flash)...");
        try {
          // Fallback Model
          const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const fallbackResult = await fallbackModel.generateContent(text);
          const fallbackResponse = fallbackResult.response.text();

          res.json({ suggestion: fallbackResponse });
          return;
        } catch (fallbackError: any) {
          console.error("Fallback Model also failed:", fallbackError.message);
          // Fall through to error handler
        }
      }

      throw primaryError; // Re-throw if not retriable or fallback failed
    }

  } catch (error: any) {
    console.error("Gemini Error:", error);
    const status = error.status || (error.response ? error.response.status : 500);
    res.status(status).json({ error: error.message, details: error.toString() });
  }
});
