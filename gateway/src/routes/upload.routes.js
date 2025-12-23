import express from "express";
import multer from "multer";

import uploadController from "../controllers/upload.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// configure multer (local temp storage)
const upload = multer({ dest: "uploads/" });

// POST /upload
router.post(
  "/",
  auth,
  upload.single("file"),
  uploadController.upload
);

export default router;
