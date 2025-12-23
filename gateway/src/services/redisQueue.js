import { Queue, QueueEvents } from "bullmq";
import Redis from "ioredis";

// BullMQ requires this
const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const fileQueue = new Queue("file-queue", { connection });
const fileQueueEvents = new QueueEvents("file-queue", { connection });

/**
 * Enqueue a new file-processing job
 */
async function addJob(data) {
  const job = await fileQueue.add("process-file", data);
  return job;
}

export { addJob, fileQueueEvents };
