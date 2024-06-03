import path, { dirname } from "path";
import fs from "fs/promises"; // Import fs with promises API
import { fileURLToPath } from "url";

import Offer from "../models/offer.model.js";
import Quotation from "../models/quotation.model.js";
import { sendEmail } from "../helper/sendMail.helper.js";

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
    if (!quotation || !description || !price || !material || !offerer) {
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

    // Use the aggregation pipeline to fetch offer details, requester, and offerer
    const result = await Offer.aggregate([
      { $match: { _id: newOffer._id } },
      {
        $lookup: {
          from: "quotations",
          localField: "quotation",
          foreignField: "quotation_Id",
          as: "quotationDetails",
        },
      },
      { $unwind: "$quotationDetails" },
      {
        $lookup: {
          from: "users",
          localField: "quotationDetails.requester",
          foreignField: "_id",
          as: "requesterDetails",
        },
      },
      { $unwind: "$requesterDetails" },
      {
        $project: {
          quotation: 1,
          requesterDetails: {
            firstName: 1,
            lastName: 1,
            email: 1,
          },
        },
      },
    ]);

    //Send email
    if (result) {
      const emailSubject = `SolarMarket - New Offer Received for Your Request #${result[0].quotation}`;
      const emailText = `New Offer Received for Your Request #${result[0].quotation}`;
      const emailHtml = `<html>
          <head>
              <style>
                  body {
                      font-family: Poppins, sans-serif;
                      background-color: #FFF8F1;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 50px auto;
                      background-color: #fff;
                      padding: 30px 50px;
                      border: 1px solid #e5e7eb;
                      border-radius: 8px;
                      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
                  }
                  h1 {
                      color: #E45416;
                  }
                  p {
                      color: #333;
                      font-size: 16px;
                      line-height: 1.6;
                  }
                  a {
                      display: inline-block;
                      color: #E45416 !important;
                      text-decoration: none;
                  }
                  span{
                    color:#E45416;
                  }
                  a:hover{
                    color:#EE723C !important;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>New Offer Received for Your Request #${result[0].quotation}</h1>
                  <p>Dear ${result[0].requesterDetails.firstName} ${result[0].requesterDetails.lastName},</p>
                  <p>We are excited to inform you that you have received a new offer for the request you posted under ID #${result[0].quotation}.</p>
                  <p>To review the details of the offer and take the next steps, please click 
                  <a href="${process.env.PUBLIC_FRONTEND}/my-requests/${result[0].quotation}">here</a>.</p>
                  <p>Thank you for using our platform. We wish you the best of luck with your transaction!</p>
                  <p>Best regards,<br/>
                  <span>SolarMarket</span> Team</p>
              </div>
          </body>
          </html>`;

      await sendEmail(
        result[0].requesterDetails.email,
        emailSubject,
        emailText,
        emailHtml
      );
    }

    res.status(201).json({
      message: "Offer added successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Duplicate error: Your offer already exists",
      });
      try {
        if (req.file) {
          await fs.unlink(filePath);
        }
      } catch (error) {
        console.error("Error removing uploaded file:", error);
      }
    } else {
      res.status(500).json({ error: "Internal Server error" });
      try {
        if (req.file) {
          await fs.unlink(filePath);
        }
      } catch (error) {
        console.error("Error removing uploaded file:", error);
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

    try {
      if (req.file) {
        await fs.unlink(filePath);
      }
    } catch (error) {
      console.error("Error removing uploaded file:", error);
    }

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

// @desc    Accept an offer
// @route   POST /api/offers/accept-offer/:id
// @access  Private
export const acceptOffer = async (req, res) => {
  const _id = req.params.id;
  const requester = req.user._id;
  const { quotation } = req.body;

  try {
    const offer = await Offer.findById(_id).populate("offerer");

    if (!offer) {
      return res.status(404).json({ error: "Offer not founded" });
    }

    if (offer.status === "Accepted") {
      return res.status(400).json({ error: "Offer already accepted" });
    }

    const quotationDetails = await Quotation.findOne({
      quotation_Id: quotation,
    });

    if (String(quotationDetails.requester._id) !== String(requester)) {
      return res
        .status(401)
        .json({ error: "You can only accept your request offers" });
    }

    await Offer.updateMany({ quotation }, { $set: { status: "Not Accepted" } });

    offer.status = "Accepted";
    await offer.save();

    quotationDetails.isOpen = false;
    await quotationDetails.save();

    //Send verification email
    if (offer) {
      const emailSubject = `SolarMarket - Your Offer for Request ${quotation} Has Been Accepted`;
      const emailText = `Your Offer for Request ${quotation} Has Been Accepted`;
      const emailHtml = `<html>
            <head>
                <style>
                    body {
                        font-family: Poppins, sans-serif;
                        background-color: #FFF8F1;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        background-color: #fff;
                        padding: 30px 50px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #E45416;
                    }
                    p {
                        color: #333;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    a {
                        display: inline-block;
                        color: #E45416 !important;
                        text-decoration: none;
                    }
                    span{
                      color:#E45416;
                    }
                    a:hover{
                      color:#EE723C !important;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Your Offer for Request ${quotation} Has Been Accepted</h1>
                    <p>Dear ${offer.offerer.firstName} ${offer.offerer.lastName},</p>
                    <p>We are pleased to inform you that the buyer has accepted your offer for the request posted under ID #${quotation}.</p>
                    <p>Please proceed with the necessary arrangements to fulfill the transaction. You can view the details and communicate with the buyer by clicking
                    <a href="${process.env.PUBLIC_FRONTEND}/request/${quotation}">here</a>.</p>
                    <p>If you have any questions or need assistance, feel free to reach out to our support team. We're here to ensure a smooth and successful transaction for you.</p>
                    <p>Thank you for using our platform. We wish you the best of luck with your transaction!</p>
                    <p>Best regards,<br/>
                    <span>SolarMarket</span> Team</p>
                </div>
            </body>
            </html>`;

      await sendEmail(offer.offerer.email, emailSubject, emailText, emailHtml);
    }

    res.status(200).json({ message: "Offer accepted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// @desc    Decline an offer
// @route   POST /api/offers/decline-offer/:id
// @access  Private
export const DeclineOffer = async (req, res) => {
  const _id = req.params.id;
  const requester = req.user._id;
  const { quotation } = req.body;

  try {
    const offer = await Offer.findById(_id).populate("offerer");

    if (!offer) {
      return res.status(404).json({ error: "Offer not founded" });
    }

    if (offer.status === "Decline") {
      return res.status(400).json({ error: "Offer already decline" });
    }

    const quotationDetails = await Quotation.findOne({
      quotation_Id: quotation,
    });

    if (String(quotationDetails.requester._id) !== String(requester)) {
      return res
        .status(401)
        .json({ error: "You can only decline your request offers" });
    }

    offer.status = "Decline";
    await offer.save();

    //Send verification email
    if (offer) {
      const emailSubject = `SolarMarket - Your Offer for Request ${quotation} Has Been Declined`;
      const emailText = `SolarMarket - Your Offer for Request ${quotation} Has Been Declined`;
      const emailHtml = `<html>
            <head>
                <style>
                    body {
                        font-family: Poppins, sans-serif;
                        background-color: #FFF8F1;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        background-color: #fff;
                        padding: 30px 50px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #E45416;
                    }
                    p {
                        color: #333;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    a {
                        display: inline-block;
                        color: #E45416 !important;
                        text-decoration: none;
                    }
                    span{
                      color:#E45416;
                    }
                    a:hover{
                      color:#EE723C !important;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Your Offer for Request ${quotation} Has Been Declined</h1>
                    <p>Dear ${offer.offerer.firstName} ${offer.offerer.lastName},</p>
                    <p>We regret to inform you that the buyer has declined your offer for their request under ID #${quotation}.</p>
                    <p>While this decision may be disappointing, we encourage you to continue exploring opportunities on our platform. Your products are valuable, and there may be other buyers interested in what you have to offer.</p>
                    <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team. We're here to help you navigate through any challenges and ensure a positive experience on our platform.</p>
                    <p>Thank you for using our services, and we wish you success in your future transactions!</p>
                    <p>Best regards,<br/>
                    <span>SolarMarket</span> Team</p>
                </div>
            </body>
            </html>`;

      await sendEmail(offer.offerer.email, emailSubject, emailText, emailHtml);
    }

    res.status(200).json({ message: "Offer declined successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
