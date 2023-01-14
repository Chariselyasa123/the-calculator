import Statistic from "../models/statistic.model.js";

export const getAllStatistics = async (req, res) => {
  const statistics = await Statistic.find().populate("user", "name email");
  res.json(statistics);
};
