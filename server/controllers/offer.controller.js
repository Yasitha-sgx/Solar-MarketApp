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
  const offerer = req.user._id;
  const { quotation, description, price } = req.body;
  const material = req.file.filename;

  const filePath = path.join(__dirname, "../../uploads", req.file.filename);
  try {
    if (!quotation || !description || !price || !offerer) {
      try {
        if (req.file) {
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
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate error: Your offer already exists",
      });
      if (req.file) {
        await fs.unlink(filePath);
      }
    } else {
      res.status(500).json({ error: "Internal Server error" });
      if (req.file) {
        await fs.unlink(filePath);
      }
    }
  }
};

// @desc    Get Single offer
// @route   GET /api/offers/get-offer
// @access  Private
export const getOffer = async (req, res) => {
  const offerer = req.user._id;
  const { quotation } = req.body;

  try {
    const offer = await Offer.findOne({ quotation, offerer }).select({
      _id: 1,
      offerer: 1,
      quotation: 1,
      description: 1,
      price: 1,
      material: 1,
      status: 1,
      createdAt: 1,
    });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// @desc    Delete an offer if status is pending or declined
// @route   DELETE /api/offers/delete-offer/:quotation
// @access  Private
export const deleteOffer = async (req, res) => {
  const offerer = req.user._id;
  const quotation = req.params.quotation;

  try {
    const offer = await Offer.findOne({ quotation, offerer });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (offer.status === "Accepted") {
      return res.status(400).json({
        error:
          "You cannot delete this offer because it has already been accepted.",
      });
    }

    const filePath = path.join(__dirname, "../../uploads", offer.material);

    await Offer.findByIdAndDelete(offer._id);

    await fs.unlink(filePath);

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// @desc    Edit an offer
// @route   PUT /api/offers/edit-offer/:quotation
// @access  Private
export const editOffer = async (req, res) => {
  const offerer = req.user._id;
  const quotation = req.params.quotation;
  const { description, price } = req.body;

  try {
    const offer = await Offer.findOne({ quotation, offerer });

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    if (req.file) {
      const oldFilePath = path.join(__dirname, "../../uploads", offer.material);
      try {
        await fs.unlink(oldFilePath);
      } catch (error) {
        console.error("Error removing old uploaded file:", error);
      }
      offer.material = req.file.filename;
    }

    if (description) offer.description = description;
    if (price) offer.price = price;

    await offer.save();

    res.status(200).json({ message: "Offer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });

    if (req.file) {
      const filePath = path.join(__dirname, "../../uploads", req.file.filename);
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error("Error removing uploaded file:", error);
      }
    }
  }
};
