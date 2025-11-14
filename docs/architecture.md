# Student Productivity Tracker — Architecture Documentation

## Overview
The Student Productivity Tracker is a MERN + AI platform designed to help students set goals, track activities, visualize productivity analytics, and receive AI-generated insights.

This document describes the **hybrid deployment architecture**:
- **Frontend:** Vercel
- **Backend (API):** Railway
- **AI Layer:** Firebase Functions
- **Database:** MongoDB Atlas
- **Caching:** Redis (Railway plugin or managed Redis)

---

## System Architecture

[User Browser / Mobile App]
|
| HTTPS
v
[Vercel Frontend]
(React + TailwindCSS + Zustand/Redux)
|
Authenticated REST calls (JWT)
|
v
[Railway Backend API]
Node.js + Express
Routes:
- Auth
- Goals
- Activities
- Analytics
- AI Proxy
|
MongoDB Atlas
Redis Cache
|
Secure server-to-server call
|
v
[Firebase Functions - AI Layer]
- LLM calls
- Suggestions, summaries
- RAG pipeline (optional)


---

## Component Responsibilities

### Frontend (Vercel)
- Handles UI, charts, goal management, dashboards.
- Stores access token securely (httpOnly cookie or memory).
- Communicates with backend via HTTPS.
- Does **not** call OpenAI directly (for security).

### Backend (Railway - Express)
- Authentication (JWT access + refresh tokens)
- CRUD operations for:
  - Goals
  - Activities
  - Analytics
- Caching for performance (Redis)
- Secure AI proxy to Firebase Functions
- Aggregation pipelines for weekly/monthly productivity stats

### Firebase Functions (AI Layer)
- Stateless AI microservices:
  - Personalized suggestions
  - Activity summaries
  - RAG-based contextual insights
- Calls OpenAI (or other LLM API)
- Returns processed text to Railway backend

---

## Data Flow Examples

### 1. User Logs Activity
1. Client → POST `/activities`
2. Backend → MongoDB insert
3. Backend → Update / invalidate Redis caches

### 2. User Requests AI Suggestion
1. Client → GET `/goals/:id/suggestion`
2. Backend → Check Redis cache
3. If miss → Backend → Firebase Function
4. Firebase → LLM → suggestion
5. Backend caches + returns to client

### 3. Background Summarization
- Firebase scheduled function fetches user data (via backend).
- Creates weekly summaries and stores in DB.

---

## Deployment
- Frontend auto-deploys on Vercel.
- Backend auto-deploys on Railway from `/server`.
- Firebase Functions deploy from `/ai-functions` using Firebase CLI.
