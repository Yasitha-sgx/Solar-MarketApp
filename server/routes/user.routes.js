import Router from "express";
import {
  forgotPassword,
  resetPassword,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/user.controller.js";

const router = Router();

//Authentication
router.post("/sign-in", signIn);

//public
router.post("/sign-up", signUp);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
