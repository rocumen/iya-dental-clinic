import express from "express";

import {
  registerUser,
  authUser,
  logoutUser,
  changePassword,
  getUserById,
  resetPassword,
} from "../controller/userController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.put("/changePassword/:id", changePassword);
router.get("/userProfile/:id", getUserById);
router.post("/resetPassword", resetPassword);

export default router;
