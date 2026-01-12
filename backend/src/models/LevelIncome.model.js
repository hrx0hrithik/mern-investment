import mongoose from "mongoose"

const levelIncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  level: Number,
  amount: Number,
  date: String
});

// INDEXES
levelIncomeSchema.index({ user: 1, date: 1 });

export default mongoose.model("LevelIncome", levelIncomeSchema);
