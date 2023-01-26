/**
 * ? DB Details
 */
const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE
});

pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = pool;