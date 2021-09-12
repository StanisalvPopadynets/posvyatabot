import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

export default (table) => ({
  query(sql, args) {
    return pool.query(sql, args);
  },

  async checkIfBanned(id) {
    try {
      const result = await pool.query(`SELECT * FROM ${table} WHERE user_id = $1`, [id]);
      if (result.rowCount) return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async create(id) {
    const sql = `INSERT INTO "${table}" (user_id) VALUES (${id})`;
    let result;
    try {
      await pool.query(sql);
      result = "Успешно забанен!";
    } catch (e) {
      if (e.detail.includes("already exists")) {
        return (result = "Уже забанен!");
      }
      return (result = "Ошибка при бане!");
    }
    return result;
  },

  async delete(id) {
    const sql = `DELETE FROM ${table} WHERE user_id = $1`;
    let result;
    try {
      await pool.query(sql, [id]);
      result = "Успешно разбанен!";
    } catch (e) {
      result = "Ошибка при разбане!";
    }
    return result;
  },
});
