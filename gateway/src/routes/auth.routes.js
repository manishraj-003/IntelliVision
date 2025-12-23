import express from "express";
import authController from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/profile", auth, authController.profile);

export default router;
