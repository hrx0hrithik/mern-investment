import mongoose from "mongoose";
import ROIHistory from "../models/ROIHistory.model.js";

export const getDailyROI = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);

  const data = await ROIHistory.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: "$date",
        roi: { $sum: "$roiAmount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  res.json(
    data.map(d => ({
      date: d._id,
      roi: d.roi
    }))
  );
};
