import mongoose from "mongoose";

const offerSchema = mongoose.Schema(
  {
    offerer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    material: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
