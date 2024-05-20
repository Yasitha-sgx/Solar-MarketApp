import path, { dirname } from "path";
import fs from "fs/promises"; // Import fs with promises API
import { fileURLToPath } from "url";

import Offer from "../models/offer.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @desc    Request a quotation
// @route   POST /api/quotations/request-quotation
// @access  private
export const addOffer = async (req, res) => {
  try {
    const offerer = req.user._id;
    const { quotation, description, price } = req.body;
    const material = req.file.filename;

    if (!quotation || !description || !price || !offerer) {
      try {
        if (req.file) {
          const filePath = path.join(
            __dirname,
            "../../uploads",
            req.file.filename
          );
          await fs.unlink(filePath);
        }
      } catch (error) {
        console.error("Error removing uploaded file:", error);
      }

      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOffer = new Offer({
      offerer,
      quotation,
      description,
      price,
      material,
    });

    await newOffer.save();

    res.status(201).json({ message: "Offer added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });

    try {
      if (req.file) {
        const filePath = path.join(
          __dirname,
          "../../uploads",
          req.file.filename
        );
        await fs.unlink(filePath);
      }
    } catch (error) {
      console.error("Error removing uploaded file:", error);
    }
  }
};
