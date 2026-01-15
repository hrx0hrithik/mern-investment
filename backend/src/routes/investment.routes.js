import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createInvestment,
  getMyInvestments
} from "../controllers/investment.controller.js";
import { getDailyROI } from "../controllers/roi.controller.js";

const router = express.Router();

router.post("/", auth, createInvestment);
router.get("/", auth, getMyInvestments);
router.get("/roi/daily", auth, getDailyROI);

export default router;
