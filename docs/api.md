# Student Productivity Tracker — API Documentation

## Base URL
Production:
- Backend (Railway): https://your-backend-url.com
- Firebase AI Function: https://your-firebase-url.cloudfunctions.net

---

# AUTH ROUTES

## POST /auth/register
Request:
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "message": "User registered successfully"
}

---

## POST /auth/login
Request:
{
  "email": "john@example.com",
  "password": "123456"
}

Response:
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "...",
    "name": "John"
  }
}

---

# USER ROUTES

## GET /user/me
Headers: Authorization: Bearer <accessToken>

Response:
{
  "id": "...",
  "name": "John",
  "email": "john@example.com"
}

---

# GOALS ROUTES

## GET /goals
Response:
[
  {
    "id": "...",
    "title": "Learn React",
    "category": "Skill",
    "type": "mid-term",
    "deadline": "2025-02-28",
    "progress": 40
  }
]

---

## POST /goals
Request:
{
  "title": "Learn React",
  "category": "Skill",
  "type": "mid-term",
  "deadline": "2025-02-28"
}

---

## PATCH /goals/:id
Request:
{
  "progress": 60
}

---

# ACTIVITIES ROUTES

## GET /activities?goalId=xyz
Response:
[
  {
    "id": "...",
    "description": "Studied hooks",
    "timeSpent": 45,
    "status": "completed",
    "resourceLink": "https://react.dev"
  }
]

---

## POST /activities
Request:
{
  "goalId": "...",
  "description": "Completed Module 1",
  "timeSpent": 40,
  "resourceLink": "https://..."
}

---

# ANALYTICS ROUTES

## GET /analytics/dashboard
Response:
{
  "weeklyProductivity": 74,
  "topCategories": ["Coding", "Health"],
  "activitiesCompleted": 15,
  "timeSpentByCategory": {
    "Coding": 540,
    "Health": 90
  }
}

---

# AI ROUTES (via Firebase)

## GET /goals/:goalId/suggestion
Response:
{
  "suggestion": "You’re close to finishing — try breaking the last 40% into 3 study blocks."
}
