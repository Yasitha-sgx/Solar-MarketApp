import Router from "express";
import {
  allQuotationList,
  getQuotationById,
  getUserQuotationById,
  myQuotationList,
  requestQuotation,
} from "../controllers/quotation.controller.js";
import { checkBuyerRole, protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/user-quotations/:quotation_Id",
  protect,
  checkBuyerRole,
  getUserQuotationById
);
router.post("/request-quotation", protect, checkBuyerRole, requestQuotation);
router.get("/user-quotations", protect, checkBuyerRole, myQuotationList);
router.get("/:quotation_Id", getQuotationById);
router.get("/", allQuotationList);

export default router;
