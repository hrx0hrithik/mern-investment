import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, referredBy } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const payload = {
    name,
    email,
    password: hash
  };

  if (referredBy) payload.referredBy = referredBy;

  const user = await User.create(payload);

  if (referredBy) {
    await User.findByIdAndUpdate(referredBy, {
      $push: { referrals: user._id }
    });
  }

  res.json({ message: "Registered" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};
