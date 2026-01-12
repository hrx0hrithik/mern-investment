import mongoose from "mongoose"

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  plan: String,
  roiPercent: Number,
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ["ACTIVE", "COMPLETED"],
    default: "ACTIVE"
  }
}, { timestamps: true });

// INDEXES
investmentSchema.index({ user: 1, status: 1 });

export default mongoose.model("Investment", investmentSchema);
