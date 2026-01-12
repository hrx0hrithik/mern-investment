import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getReferralTree } from "../controllers/referral.controller.js";

const router = express.Router();

router.get("/tree", auth, getReferralTree);

export default router;
