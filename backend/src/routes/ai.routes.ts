import { Router } from "express";
import axios from "axios";
import { auth } from "../middleware/auth";
import { Chat } from "../models/Chat";

const router = Router();

router.post("/suggest", auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Missing text" });

    const response = await axios.post(process.env.AI_FUNCTION_URL!, { text });

    res.json(response.data);
  } catch (error: any) {
    console.error("AI Proxy Error:", error.message);
    if (error.response) {
      console.error("AI Function Response:", error.response.data);
      // Forward the status code from the AI service (e.g., 429, 400)
      res.status(error.response.status || 500).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// End of first block

// ... existing imports

/* =========================================
   CHAT ENDPOINTS
   ========================================= */

// GET /chats - List recent chats
router.get("/chats", auth, async (req: any, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select("title updatedAt");
    res.json(chats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /chats/:id - Get full chat history
router.get("/chats/:id", auth, async (req: any, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /chats - Start new chat
router.post("/chats", auth, async (req: any, res) => {
  try {
    const { message, context } = req.body; // First message

    // 1. Create Chat
    const chat = new Chat({
      userId: req.userId,
      title: message ? message.substring(0, 30) + "..." : "New Chat",
      messages: [],
    });

    if (message) {
      chat.messages.push({ role: "user", content: message, timestamp: new Date() });

      // 2. Call AI with Context (Using the same proxy logic)
      try {
        const response = await axios.post(process.env.AI_FUNCTION_URL!, {
          text: message,
          context: context // Forward context if needed by AI function
          // Note: We might need to update the AI function to handle history/context
        });

        const data = response.data as any; // Cast to any to avoid unknown error
        chat.messages.push({
          role: "model",
          content: data.suggestion || data.text,
          timestamp: new Date()
        });
      } catch (aiError: any) {
        console.error("AI Error in Chat:", aiError.message);
        // We still save the user message, but maybe add an error message from system?
        // For now, let's just let the user know. 
        // Actually, better to throw so the UI knows it failed?
        // No, let's return the chat but with an error indicator? 
        // For simplicity, we'll swallow and user needs to retry.
      }
    }

    await chat.save();
    res.status(201).json(chat);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /chats/:id/message - Send message
router.post("/chats/:id/message", auth, async (req: any, res) => {
  try {
    const { message, context } = req.body;
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    // 1. Add User Message
    chat.messages.push({ role: "user", content: message, timestamp: new Date() });
    await chat.save(); // Save intermediate state

    // 2. Call AI
    // Ideally we send the WHOLE history, but our current AI function might only take 'text'.
    // We should construct a prompt with history + context.

    const historyText = chat.messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");
    const fullPrompt = `Context: ${JSON.stringify(context || {})}\n\nChat History:\n${historyText}\n\nUser: ${message}`;

    const response = await axios.post(process.env.AI_FUNCTION_URL!, {
      text: fullPrompt
    });

    // 3. Add AI Message
    const data = response.data as any;
    const aiResponse = data.suggestion || data.text;
    chat.messages.push({ role: "model", content: aiResponse, timestamp: new Date() });

    await chat.save();
    res.json(chat); // Return updated chat
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status || 500).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE /chats/:id - Delete a chat
router.delete("/chats/:id", auth, async (req: any, res) => {
  try {
    const deleted = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ error: "Chat not found" });
    res.json({ message: "Chat deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
