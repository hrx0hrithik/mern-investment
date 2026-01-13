import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import investmentRoutes from "./routes/investment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js"

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "OK" });
});

app.use("/api/auth", authRoutes);

app.use("/api/investments", investmentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/referrals", referralRoutes);

app.use(errorHandler);

export default app;
