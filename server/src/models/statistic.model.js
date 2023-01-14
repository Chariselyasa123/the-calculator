import mongoose from "mongoose";

const Statistic = new mongoose.Schema(
  {
    loginTime: {
      type: Date,
      required: true,
    },
    logoutTime: {
      type: Date,
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { collectionName: "statistic-data" }
);

const model = mongoose.model("Statistic", Statistic);

export default model;
