import Router from "express";
import { checkSellerRole, protect } from "../middleware/auth.middleware.js";
import {
  addOffer,
  deleteOffer,
  editOffer,
  getOffer,
} from "../controllers/offer.controller.js";
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
router.post("/get-offer", protect, checkSellerRole, getOffer);
router.delete(
  "/delete-offer/:quotation",
  protect,
  checkSellerRole,
  deleteOffer
);
router.post(
  "/edit-offer/:quotation",
  protect,
  checkSellerRole,
  upload.single("material"),
  editOffer
);

export default router;
