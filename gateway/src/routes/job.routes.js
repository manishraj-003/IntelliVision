import express from "express";
import { addJob } from "../services/redisQueue.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const job = await addJob(req.body);
  res.json({ jobId: job.id });
});

export default router;
