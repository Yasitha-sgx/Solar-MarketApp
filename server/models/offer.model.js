import mongoose from "mongoose";

const offerSchema = mongoose.Schema(
  {
    offerer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quotation: {
      type: Number,
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
      enum: ["Pending", "Accepted", "NotAccepted", "Decline"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.index({ offerer: 1, quotation: 1 }, { unique: true });

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
