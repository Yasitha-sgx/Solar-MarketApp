import mongoose from "mongoose";

import Quotation from "../models/quotation.model.js";

// @desc    Request a quotation
// @route   POST /api/quotations/request-quotation
// @access  private
export const requestQuotation = async (req, res) => {
  try {
    const id = req.user._id;
    const {
      services,
      propertyConnection,
      existingSystem,
      roofType,
      numberOfStories,
      solarSystemSize,
      buildingAddress,
      city,
      district,
      additionalNotes,
    } = req.body;

    //Checking if values is empty
    if (
      !services ||
      !propertyConnection ||
      !existingSystem ||
      !roofType ||
      !numberOfStories ||
      !solarSystemSize ||
      !buildingAddress ||
      !city ||
      !district ||
      !additionalNotes
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const maxQuotation = await Quotation.aggregate([
      {
        $group: {
          _id: null,
          maxQuotationId: { $max: "$quotation_Id" },
        },
      },
    ]);

    const nextQuotationId =
      maxQuotation.length > 0 ? maxQuotation[0].maxQuotationId + 1 : 1;

    // Create new Quotation
    const newQuotation = new Quotation({
      quotation_Id: nextQuotationId,
      requester: id,
      services,
      propertyConnection,
      existingSystem,
      roofType,
      numberOfStories,
      solarSystemSize,
      buildingAddress,
      city,
      district,
      additionalNotes,
    });

    await newQuotation.save();
    return res.status(201).json(newQuotation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Get all quotation lists
// @route   GET /api/quotations/
// @access  Public
export const allQuotationList = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;

  try {
    const totalQuotations = await Quotation.countDocuments({ isOpen: true }); // Get total count of documents

    const quotations = await Quotation.aggregate([
      {
        $match: {
          isOpen: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          purpose: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          city: 1,
          district: 1,
          additionalNotes: 1,
          isOpen: 1,
          requester: {
            requesterFirstName: "$userDetails.firstName",
            requesterLastName: "$userDetails.lastName",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $group: {
          _id: null,
          quotations: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: { path: "$quotations", includeArrayIndex: "quotationNumber" },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$quotations",
              {
                quotationNumber: {
                  $subtract: [totalQuotations, "$quotationNumber"],
                },
              },
            ],
          },
        },
      },
      {
        $skip: (page - 1) * limit, // Calculate the number of pages
      },
      {
        $limit: limit, // Limit the number of items returned per page
      },
    ]);

    res.status(200).json({
      totalQuotations,
      quotations,
      currentPage: page,
      totalPages: Math.ceil(totalQuotations / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user quotation lists
// @route   GET /api/quotations/user-quotation
// @access  Private
export const myQuotationList = async (req, res) => {
  const id = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;

  try {
    const totalQuotations = await Quotation.countDocuments({
      requester: id,
      isOpen: true,
    });

    const quotations = await Quotation.aggregate([
      {
        $match: {
          requester: new mongoose.Types.ObjectId(id),
          isOpen: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: { path: "$userDetails" },
      },
      {
        $project: {
          purpose: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          city: 1,
          district: 1,
          additionalNotes: 1,
          requester: {
            requesterFirstName: "$userDetails.firstName",
            requesterLastName: "$userDetails.lastName",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $group: {
          _id: null,
          quotations: { $push: "$$ROOT" },
        },
      },
      {
        $unwind: { path: "$quotations", includeArrayIndex: "quotationNumber" },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$quotations",
              {
                quotationNumber: {
                  $subtract: [totalQuotations, "$quotationNumber"],
                },
              },
            ],
          },
        },
      },
      {
        $skip: (page - 1) * limit, // Calculate the number of pages to skip
      },
      {
        $limit: limit, // Limit the number of items returned per page
      },
    ]);

    res.status(200).json({
      totalQuotations,
      quotations,
      currentPage: page,
      totalPages: Math.ceil(totalQuotations / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
