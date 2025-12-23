import pool from "../db.js";

const Result = {
  async saveResult(fileId, ocrText, summary, objects) {
    const { rows } = await pool.query(
      `
      INSERT INTO results (file_id, ocr_text, summary, objects)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [fileId, ocrText, summary, objects]
    );

    return rows[0];
  },

  async getByFileId(fileId) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM results
      WHERE file_id = $1
      `,
      [fileId]
    );

    return rows[0];
  },
};

export default Result;
