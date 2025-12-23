import File from "../models/file.model.js";
import queue from "../queue/file.queue.js";

/**
 * Upload file → enqueue job → return jobId
 */
const uploadController = {
  async upload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const start = Date.now();

      // save file metadata
      const file = await File.saveFile(
        req.user.id,
        req.file.originalname,
        0
      );

      // enqueue processing job
      const job = await queue.add("process-file", {
        fileId: file.id,
        path: req.file.path,
        filename: req.file.originalname,
        userId: req.user.id,
        startedAt: start,
      });

      return res.json({
        status: "queued",
        jobId: job.id,
        fileId: file.id,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  },
};

export default uploadController;
