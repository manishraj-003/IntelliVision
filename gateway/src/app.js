import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jobRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import historyRoutes from "./routes/history.routes.js";

dotenv.config();

const app = express();

/* global middleware */
app.use(cors());
app.use(express.json());

/* routes */
app.use("/job", jobRoutes);
app.use("/auth", authRoutes);
app.use("/history", historyRoutes);

/* health check */
app.get("/", (req, res) => {
  res.send("IntelliVision Gateway Running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
