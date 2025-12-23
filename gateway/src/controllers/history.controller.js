import File from "../models/file.model.js";
import Result from "../models/result.model.js";

const historyController = {
  // USER HISTORY
  async getHistory(req, res) {
    try {
      const files = await File.getFilesByUser(req.user.id);
      const history = [];

      for (const f of files) {
        const result = await Result.getByFileId(f.id);
        history.push({
          id: f.id,
          filename: f.filename,
          latency: f.latency,
          created_at: f.created_at,
          summary: result?.summary || null,
          objects: result?.objects || [],
        });
      }

      res.json({ history });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  // ADMIN HISTORY
  async getAllHistory(req, res) {
    try {
      const files = await File.getAllFilesWithUsers();
      const history = [];

      for (const f of files) {
        const result = await Result.getByFileId(f.id);
        history.push({
          user_id: f.user_id,
          user_name: f.user_name,
          filename: f.filename,
          latency: f.latency,
          created_at: f.created_at,
          summary: result?.summary || null,
          objects: result?.objects || [],
        });
      }

      res.json({ history });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};

export default historyController;
