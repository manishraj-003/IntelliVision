import { Worker } from "bullmq";
import Redis from "ioredis";
import axios from "axios";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const PROCESSOR_URL = process.env.PROCESSOR_URL || "http://localhost:8001";

const connection = new Redis(REDIS_URL, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "file-queue", // MUST MATCH GATEWAY
  async (job) => {
    const { fileId, path } = job.data;

    console.log("Processing job:", job.id);

    const response = await axios.post(
      `${PROCESSOR_URL}/process`,
      { fileId, path }
    );

    return response.data;
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});

console.log("Node Worker started...");
