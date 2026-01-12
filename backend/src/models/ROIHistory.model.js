import mongoose from "mongoose"

const roiHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  investment: { type: mongoose.Schema.Types.ObjectId, ref: "Investment" },
  date: String,
  roiAmount: Number
});

// INDEXES (for idempotent cron)
roiHistorySchema.index(
  { investment: 1, date: 1 },
  { unique: true }
);

export default mongoose.model("ROIHistory", roiHistorySchema);
