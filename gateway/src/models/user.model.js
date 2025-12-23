import pool from "../db.js";

const User = {
  async create({ name, email, password, role = "user" }) {
    const { rows } = await pool.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role
      `,
      [name, email, password, role]
    );

    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    return rows[0];
  },

  async findById(id) {
    const { rows } = await pool.query(
      `SELECT id, name, email, role FROM users WHERE id = $1`,
      [id]
    );

    return rows[0];
  }
};

export default User;
