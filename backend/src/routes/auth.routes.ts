import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import { updateProfile } from "../controllers/auth.controller";
const router = Router();

router.post(
  "/register",
  validate((req) => {
    const errors = [];
    if (!req.body.name) errors.push("Name is required");
    if (!req.body.email || !req.body.email.includes("@"))
      errors.push("Valid email required");
    if (!req.body.password || req.body.password.length < 6)
      errors.push("Password must be at least 6 characters");
    return errors;
  }),
  register
);

router.post(
  "/login",
  validate((req) => {
    const errors = [];
    if (!req.body.email) errors.push("Email is required");
    if (!req.body.password) errors.push("Password is required");
    return errors;
  }),
  login
);

/* 🔥 NEW ROUTE */
router.get("/me", auth, me);

router.patch("/profile", auth, updateProfile);


export default router;
