import Offer from "../models/offer.model.js";
import path, { dirname } from "path";

// @desc    Request a quotation
// @route   POST /api/quotations/request-quotation
// @access  private
export const addOffer = async (req, res) => {
  try {
    const offerer = req.user._id;
    const { description } = req.body;
    // const proposal = req.file ? req.file.path : null;

    console.log({ offerer, description });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
