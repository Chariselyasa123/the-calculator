import express from "express";
import {
  login,
  register,
  getAllUsers,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verify-token.js";
const router = express.Router();

router.get("/get", verifyToken, getAllUsers);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/token", refreshToken);

export default router;
