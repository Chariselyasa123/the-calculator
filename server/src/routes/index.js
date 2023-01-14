import express from "express";
const router = express.Router();

import authRoute from "./auth.route.js";
import statisticsRoute from "./statistics.route.js";

router.use("/api/auth", authRoute);
router.use("/api/statistics", statisticsRoute);

export default router;
