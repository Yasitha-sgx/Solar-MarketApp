import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 60,
    default: Date.now(),
  },
});

const Token = mongoose.model("Token", tokenSchema);
export default Token;
