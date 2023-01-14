import express from "express";
import { getAllStatistics } from "../controllers/statistic.controller.js";
const router = express.Router();

router.get("/", getAllStatistics);

export default router;
