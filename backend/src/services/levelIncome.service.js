import User from "../models/User.model.js";
import LevelIncome from "../models/LevelIncome.model.js";

const LEVEL_PERCENTS = [0.05, 0.03, 0.02];

export const distributeLevelIncome = async (userId, amount, date) => {
  let current = await User.findById(userId);

  for (let i = 0; i < LEVEL_PERCENTS.length; i++) {
    if (!current?.referredBy) break;

    const income = amount * LEVEL_PERCENTS[i];

    await LevelIncome.create({
      user: current.referredBy,
      fromUser: userId,
      level: i + 1,
      amount: income,
      date
    });

    await User.findByIdAndUpdate(current.referredBy, {
      $inc: { balance: income }
    });

    current = await User.findById(current.referredBy);
  }
};
