import path, { dirname } from "path";
import fs from "fs/promises"; // Import fs with promises API
import { fileURLToPath } from "url";

import Offer from "../models/offer.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @desc    Add a offer
// @route   POST /api/offers/add-offer
// @access  Private
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

// @desc    Get Single offer
// @route   GET /api/offers/get-offer
// @access  Private
export const getOffer = async (req, res) => {
  const offerer = req.user._id;
  const quotation = req.params.quotation; // Access id parameter from request

  try {
    const offer = await Offer.findOne({ quotation, offerer }).select({
      _id: 1,
      quotation: 1,
      description: 1,
      price: 1,
      material: 1,
      status: 1,
    });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};
