import express from "express";
import controller from "../controllers/history.controller.js";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

const router = express.Router();

// user history
router.get("/", auth, controller.getHistory);

// admin history
router.get("/all", auth, role("admin"), controller.getAllHistory);

export default router;
