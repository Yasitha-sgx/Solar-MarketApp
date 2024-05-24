import Quotation from "../models/quotation.model.js";

// @desc    Post a quotation
// @route   POST /api/quotations/request-quotation
// @access  private
export const requestQuotation = async (req, res) => {
  try {
    const requester = req.user._id;
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
      !requester ||
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
      return res.status(400).json({ error: "Missing required fields" });
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
      requester,
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
    res.status(201).json(newQuotation);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server error" });
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

  if (quotation_Id) matchCriteria.quotation_Id = parseInt(quotation_Id);
  if (services) matchCriteria.services = services;
  if (roofType) matchCriteria.roofType = roofType;
  if (solarSystemSize) matchCriteria.solarSystemSize = solarSystemSize;
  if (numberOfStories) matchCriteria.numberOfStories = numberOfStories;

  try {
    let nameRegex;
    if (name) {
      nameRegex = new RegExp(name, "i");
    }

    let buildingAddressRegex;
    if (buildingAddress) {
      buildingAddressRegex = new RegExp(buildingAddress, "i");
    }

    const pipeline = [
      {
        $match: matchCriteria,
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      {
        $unwind: { path: "$requesterDetails" },
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              "$requesterDetails.firstName",
              " ",
              "$requesterDetails.lastName",
            ],
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
            requesterFirstName: "$requesterDetails.firstName",
            requesterLastName: "$requesterDetails.lastName",
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

    const countPipeline = [
      {
        $match: matchCriteria,
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      {
        $unwind: { path: "$requesterDetails" },
      },
      {
        $addFields: {
          fullName: {
            $concat: [
              "$requesterDetails.firstName",
              " ",
              "$requesterDetails.lastName",
            ],
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
    res.status(500).json({ error: "Internal Server error" });
  }
};

// @desc    Get user quotation lists
// @route   GET /api/quotations/user-quotation
// @access  Private
export const myQuotationList = async (req, res) => {
  const requester = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;

  try {
    const totalQuotations = await Quotation.countDocuments({
      requester,
    });

    const quotations = await Quotation.aggregate([
      {
        $match: {
          requester,
        },
      },
      {
        $lookup: {
          from: "offers",
          localField: "quotation_Id",
          foreignField: "quotation",
          as: "offers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      {
        $unwind: { path: "$requesterDetails" },
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
          isOpen: 1,
          requester: {
            requesterFirstName: "$requesterDetails.firstName",
            requesterLastName: "$requesterDetails.lastName",
          },
          offerCount: { $size: "$offers" },
        },
      },
      {
        $sort: {
          isOpen: -1,
          offerCount: -1,
          quotation_Id: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({
      totalQuotations,
      quotations,
      currentPage: page,
      totalPages: Math.ceil(totalQuotations / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

// @desc    Get a single quotation by quotation_Id
// @route   GET /api/quotations/:quotation_Id
// @access  Public
export const getQuotationById = async (req, res) => {
  const quotation_Id = parseInt(req.params.quotation_Id);

  try {
    if (isNaN(quotation_Id)) {
      return res.status(400).json({ error: "Invalid quotation ID" });
    }

    const quotation = await Quotation.aggregate([
      {
        $match: { quotation_Id },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      {
        $unwind: { path: "$requesterDetails" },
      },
      {
        $project: {
          _id: 1,
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
            requesterFirstName: "$requesterDetails.firstName",
            requesterLastName: "$requesterDetails.lastName",
          },
        },
      },
    ]);

    if (!quotation || quotation.length === 0) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    res.status(200).json(quotation[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

// @desc    Get a single quotation by quotation_Id and user id
// @route   GET /api/user-quotations/:quotation_Id
// @access  Private
export const getUserQuotationById = async (req, res) => {
  const requester = req.user._id;
  const quotation_Id = parseInt(req.params.quotation_Id);

  try {
    if (isNaN(quotation_Id)) {
      return res.status(400).json({ error: "Invalid quotation ID" });
    }

    const quotation = await Quotation.aggregate([
      {
        $match: { quotation_Id, requester },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      {
        $unwind: { path: "$requesterDetails" },
      },
      {
        $lookup: {
          from: "offers",
          localField: "quotation_Id",
          foreignField: "quotation",
          as: "offers",
        },
      },
      {
        $unwind: {
          path: "$offers",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "offers.offerer",
          foreignField: "_id",
          as: "offererDetails",
        },
      },
      {
        $unwind: {
          path: "$offererDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          quotation_Id: { $first: "$quotation_Id" },
          requester: {
            $first: {
              requesterFirstName: "$requesterDetails.firstName",
              requesterLastName: "$requesterDetails.lastName",
            },
          },
          services: { $first: "$services" },
          propertyConnection: { $first: "$propertyConnection" },
          existingSystem: { $first: "$existingSystem" },
          roofType: { $first: "$roofType" },
          numberOfStories: { $first: "$numberOfStories" },
          solarSystemSize: { $first: "$solarSystemSize" },
          buildingAddress: { $first: "$buildingAddress" },
          additionalNotes: { $first: "$additionalNotes" },
          createdAt: { $first: "$createdAt" },
          offers: {
            $push: {
              offer_Id: "$offers._id",
              offererFirstName: "$offererDetails.firstName",
              offererLastName: "$offererDetails.lastName",
              description: "$offers.description",
              price: "$offers.price",
              material: "$offers.material",
              status: "$offers.status",
              createdAt: "$offers.createdAt",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          quotation_Id: 1,
          requester: 1,
          services: 1,
          propertyConnection: 1,
          existingSystem: 1,
          roofType: 1,
          numberOfStories: 1,
          solarSystemSize: 1,
          buildingAddress: 1,
          additionalNotes: 1,
          createdAt: 1,
          offers: {
            $filter: {
              input: {
                $sortArray: {
                  input: "$offers",
                  sortBy: { createdAt: -1 },
                },
              },
              as: "offer",
              cond: { $ne: ["$$offer.offer_Id", null] },
            },
          },
        },
      },
    ]);

    if (!quotation || quotation.length === 0) {
      return res.status(404).json({ error: "Quotation not found" });
    }

    res.status(200).json(quotation[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};
