import User from "../models/User.model.js";

const buildTree = async (userId) => {
  const user = await User.findById(userId).select("name email referrals");
  if (!user) return null;

  const children = await Promise.all(
    user.referrals.map(id => buildTree(id))
  );

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    referrals: children.filter(Boolean)
  };
};

export const getReferralTree = async (req, res) => {
  const tree = await buildTree(req.user.id);
  res.json(tree);
};
