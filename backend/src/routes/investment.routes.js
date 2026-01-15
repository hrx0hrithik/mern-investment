import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createInvestment,
  getMyInvestments
} from "../controllers/investment.controller.js";

const router = express.Router();

router.post("/", auth, createInvestment);
router.get("/", auth, getMyInvestments);

export default router;
