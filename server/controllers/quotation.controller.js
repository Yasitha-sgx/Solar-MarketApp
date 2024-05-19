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

  const {
    quotation_Id,
    services,
    roofType,
    solarSystemSize,
    numberOfStories,
    name,
    buildingAddress,
  } = req.query;
  const matchCriteria = {
    isOpen: true,
  };

  // Add search criteria to matchCriteria
  if (quotation_Id) matchCriteria.quotation_Id = parseInt(quotation_Id);
  if (services) matchCriteria.services = services;
  if (roofType) matchCriteria.roofType = roofType;
  if (solarSystemSize) matchCriteria.solarSystemSize = solarSystemSize;
  if (numberOfStories) matchCriteria.numberOfStories = numberOfStories;

  try {
    // Construct the regex for the name search
    let nameRegex;
    if (name) {
      nameRegex = new RegExp(name, "i");
    }

    // Construct the regex for the buildingAddress search
    let buildingAddressRegex;
    if (buildingAddress) {
      buildingAddressRegex = new RegExp(buildingAddress, "i");
    }

    // Build the aggregation pipeline for quotations
    const pipeline = [
      {
        $match: matchCriteria,
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
        $addFields: {
          fullName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            name ? { fullName: nameRegex } : {},
            buildingAddress ? { buildingAddress: buildingAddressRegex } : {},
          ],
        },
      },
      {
        $project: {
          quotation_Id: 1,
          services: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          city: 1,
          district: 1,
          additionalNotes: 1,
          createdAt: 1,
          requester: {
            requesterFirstName: "$userDetails.firstName",
            requesterLastName: "$userDetails.lastName",
          },
        },
      },
      {
        $sort: { quotation_Id: -1 },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];

    // Build the pipeline to calculate the total count
    const countPipeline = [
      {
        $match: matchCriteria,
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
        $addFields: {
          fullName: {
            $concat: ["$userDetails.firstName", " ", "$userDetails.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            name ? { fullName: nameRegex } : {},
            buildingAddress ? { buildingAddress: buildingAddressRegex } : {},
          ],
        },
      },
      {
        $count: "totalQuotations",
      },
    ];

    const totalQuotationsResult = await Quotation.aggregate(countPipeline);

    const totalQuotations =
      totalQuotationsResult.length > 0
        ? totalQuotationsResult[0].totalQuotations
        : 0;

    const quotations = await Quotation.aggregate(pipeline);

    const totalPages = Math.ceil(totalQuotations / limit);

    res.status(200).json({
      totalQuotations,
      quotations,
      currentPage: page,
      totalPages,
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
          quotation_Id: 1,
          services: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          city: 1,
          district: 1,
          additionalNotes: 1,
          additionalNotes: 1,
          createdAt: 1,
          requester: {
            requesterFirstName: "$userDetails.firstName",
            requesterLastName: "$userDetails.lastName",
          },
        },
      },
      {
        $sort: { quotation_Id: -1 },
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

// @desc    Get a single quotation by quotation_Id
// @route   GET /api/quotations/:quotation_Id
// @access  Public
export const getQuotationById = async (req, res) => {
  try {
    const quotation_Id = parseInt(req.params.quotation_Id);

    if (isNaN(quotation_Id)) {
      return res.status(400).json({ error: "Invalid quotation ID" });
    }

    const quotation = await Quotation.aggregate([
      {
        $match: { quotation_Id: quotation_Id },
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
          quotation_Id: 1,
          services: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          additionalNotes: 1,
          createdAt: 1,
          requester: {
            requesterFirstName: "$userDetails.firstName",
            requesterLastName: "$userDetails.lastName",
          },
        },
      },
    ]);

    if (!quotation || quotation.length === 0) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    res.status(200).json(quotation[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
