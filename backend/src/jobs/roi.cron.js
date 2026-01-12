import cron from "node-cron";
import { calculateDailyROI } from "../services/roi.service.js";

cron.schedule("0 0 * * *", async () => {
  const date = new Date().toISOString().slice(0, 10);
  await calculateDailyROI(date);
});
