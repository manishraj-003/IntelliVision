import pool from "../db.js";

const File = {
  async saveFile(userId, filename, latency) {
    const { rows } = await pool.query(
      `
      INSERT INTO files (user_id, filename, latency)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [userId, filename, latency]
    );

    return rows[0];
  },

  async getFilesByUser(userId) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM files
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return rows;
  },

  // ADMIN SUPPORT
  async getAllFilesWithUsers() {
    const { rows } = await pool.query(
      `
      SELECT
        files.*,
        users.id AS user_id,
        users.name AS user_name
      FROM files
      JOIN users ON users.id = files.user_id
      ORDER BY files.created_at DESC
      `
    );

    return rows;
  }
};

export default File;
