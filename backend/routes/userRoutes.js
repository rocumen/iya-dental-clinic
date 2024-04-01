import express from "express";

import {
  registerUser,
  authUser,
  logoutUser,
} from "../controller/userController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);

export default router;
