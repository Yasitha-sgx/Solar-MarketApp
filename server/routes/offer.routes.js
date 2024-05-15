import Router from "express";
import { protect } from "../middleware/auth.middleware.js";
import { addOffer } from "../controllers/offer.controller.js";

const router = Router();

//public routes
// router.get("/", allQuotationList);

//private routes
router.post("/add-offer", protect, addOffer);
// router.get("/user-quotations", protect, checkBuyerRole, myQuotationList);

export default router;
