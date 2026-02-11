import { Router } from "express";
import { auth } from "../middleware/auth";
import { Chat } from "../models/Chat";
import { getSuggestion } from "../controllers/ai.controller";
import { generateAIResponse } from "../services/ai.service";
import mongoose from "mongoose";

const router = Router();

// Replaced axios proxy with direct controller call
router.post("/suggest", auth, getSuggestion);

/* =========================================
   CHAT ENDPOINTS
   ========================================= */

// GET /chats - List recent chats
router.get("/chats", auth, async (req: any, res) => {
  try {
    const chats = await Chat.find({ userId: new mongoose.Types.ObjectId(req.userId as string) })
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
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.userId as string)
    });
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
      userId: new mongoose.Types.ObjectId(req.userId as string),
      title: message ? message.substring(0, 30) + "..." : "New Chat",
      messages: [],
    });

    if (message) {
      chat.messages.push({ role: "user", content: message, timestamp: new Date() });

      // 2. Call AI with Context (Direct Service Call)
      try {
        const aiResponse = await generateAIResponse(message);

        chat.messages.push({
          role: "model",
          content: aiResponse,
          timestamp: new Date()
        });
      } catch (aiError: any) {
        console.error("AI Error in Chat:", aiError.message);
        // Swallow error for chat creation, or handle gracefully
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
    const chat = await Chat.findOne({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.userId as string)
    });

    if (!chat) return res.status(404).json({ error: "Chat not found" });

    // 1. Add User Message
    chat.messages.push({ role: "user", content: message, timestamp: new Date() });
    await chat.save(); // Save intermediate state

    // 2. Call AI
    const historyText = chat.messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");
    const fullPrompt = `Context: ${JSON.stringify(context || {})}\n\nChat History:\n${historyText}\n\nUser: ${message}`;

    const aiResponse = await generateAIResponse(fullPrompt);

    // 3. Add AI Message
    chat.messages.push({ role: "model", content: aiResponse, timestamp: new Date() });

    await chat.save();
    res.json(chat); // Return updated chat
  } catch (error: any) {
    console.error("Chat Message Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /chats/:id - Delete a chat
router.delete("/chats/:id", auth, async (req: any, res) => {
  try {
    const deleted = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: new mongoose.Types.ObjectId(req.userId as string)
    });
    if (!deleted) return res.status(404).json({ error: "Chat not found" });
    res.json({ message: "Chat deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
