import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { calculateDailyROI } from "../services/roi.service.js";

const router = express.Router();

router.post("/roi/run", auth, async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  await calculateDailyROI(date);
  res.json({ message: "ROI cron executed manually" });
});

export default router;
