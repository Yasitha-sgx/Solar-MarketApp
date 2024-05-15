import Router from "express";
import {
  forgotPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
  verifyEmail,
} from "../controllers/user.controller.js";

const router = Router();

//Authentication routes
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

//other public routes
router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
