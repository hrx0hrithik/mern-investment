import Investment from "../models/Investment.model.js";
import ROIHistory from "../models/ROIHistory.model.js";
import User from "../models/User.model.js";
import { distributeLevelIncome } from "./levelIncome.service.js";

export const calculateDailyROI = async (date) => {
  const investments = await Investment.find({ status: "ACTIVE" });

  for (const inv of investments) {
    const roiAmount = (inv.amount * inv.roiPercent) / 100;

    // Atomic upsert to prevent double calculation
    const roiRecord = await ROIHistory.findOneAndUpdate(
      { investment: inv._id, date },
      { $setOnInsert: { user: inv.user, roiAmount, date } },
      { upsert: true, new: true }
    );

    // Skip if ROI already exists
    if (!roiRecord.isNew) continue;

    // Update user balance
    await User.findByIdAndUpdate(inv.user, { $inc: { balance: roiAmount } });

    // Distribute level income
    await distributeLevelIncome(inv.user, roiAmount, date);
  }
};
