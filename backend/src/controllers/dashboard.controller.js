import Investment from "../models/Investment.model.js"
import ROIHistory from "../models/ROIHistory.model.js"
import LevelIncome from "../models/LevelIncome.model.js"

export const getDashboard = async (req, res) => {
  const userId = req.user.id

  const investments = await Investment.find({ user: userId })

  const totalROI = await ROIHistory.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$roiAmount" } } },
  ])

  const levelIncome = await LevelIncome.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ])

  res.json({
    investments,
    totalROI: totalROI[0]?.total || 0,
    levelIncome: levelIncome[0]?.total || 0,
  })
}
