const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

pool.on("connect", () => {
  console.log("Connected to database");
});

pool.on("error", (err: any) => {
  console.log("connection failed", err);
});

module.exports = { pool };
