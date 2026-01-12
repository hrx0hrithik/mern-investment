import Investment from "../models/Investment.model.js";

export const createInvestment = async (req, res) => {
  const { amount, plan, roiPercent, endDate } = req.body;

  const investment = await Investment.create({
    user: req.user.id,
    amount,
    plan,
    roiPercent,
    startDate: new Date(),
    endDate
  });

  res.json(investment);
};

export const getMyInvestments = async (req, res) => {
  const investments = await Investment.find({ user: req.user.id });
  res.json(investments);
};
