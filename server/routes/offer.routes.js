import Router from "express";
import {
  checkBuyerRole,
  checkSellerRole,
  protect,
} from "../middleware/auth.middleware.js";
import {
  DeclineOffer,
  acceptOffer,
  addOffer,
  deleteOffer,
  editOffer,
  getOffer,
} from "../controllers/offer.controller.js";
import upload from "../config/multer.config.js";

const router = Router();

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
router.post("/accept-offer/:id", protect, checkBuyerRole, acceptOffer);
router.post("/decline-offer/:id", protect, checkBuyerRole, DeclineOffer);

export default router;
