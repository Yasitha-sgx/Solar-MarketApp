import mongoose from "mongoose";

const quotationSchema = mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    purpose: [
      {
        type: String,
        required: true,
        trim: true,
        enum: [
          "Solar Power System",
          "Battery Storage",
          "Solar Hot Water",
          "EV Charger",
        ],
      },
    ],
    propertyConnection: {
      type: String,
      required: true,
      trim: true,
      enum: ["Owner", "Renting", "Building", "Purchasing"],
    },
    existingSystem: {
      type: Boolean,
      required: true,
    },
    roofType: {
      type: String,
      required: true,
      trim: true,
      enum: ["Tile", "Tin", "Concrete"],
    },
    numberOfStories: {
      type: String,
      required: true,
      trim: true,
      enum: ["1 storey", "2 storey", "3+ storey"],
    },
    solarSystemSize: {
      type: String,
      required: true,
      trim: true,
      enum: ["1.5 KW", "2 KW", "3 KW", "4 KW", "5 KW", "5+ KW"],
    },
    buildingAddress: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    additionalNotes: {
      type: String,
      required: true,
      trim: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model("Quotation", quotationSchema);
export default Quotation;
