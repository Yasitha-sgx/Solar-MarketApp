import Router from "express";
import {
  allQuotationList,
  getQuotationById,
  myQuotationList,
  requestQuotation,
} from "../controllers/quotation.controller.js";
import { checkBuyerRole, protect } from "../middleware/auth.middleware.js";

const router = Router();

//public routes
router.get("/", allQuotationList);
router.get("/:quotation_Id", getQuotationById);

//private routes
router.post("/request-quotation", protect, checkBuyerRole, requestQuotation);
router.get("/user-quotations", protect, checkBuyerRole, myQuotationList);

export default router;
