import Router from "express";
import { checkSellerRole, protect } from "../middleware/auth.middleware.js";
import { addOffer } from "../controllers/offer.controller.js";
import upload from "../config/multer.config.js";

const router = Router();

//public routes

//private routes
router.post(
  "/add-offer",
  protect,
  checkSellerRole,
  upload.single("material"),
  addOffer
);

export default router;
