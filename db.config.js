// DB essentials

const Pool = require("pg").Pool;
require("dotenv").config();

const dbConfig = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

dbConfig.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = dbConfig;
