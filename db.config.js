// DB essentials

const Pool = require("pg").Pool;
require("dotenv").config();

const dbConfig = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database : process.env.DATABASE,
});

<<<<<<< HEAD
module.exports = dbConfig;
=======
pool.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = pool;
>>>>>>> db75deaf69a97a3fe784a863fce7486d8b62e3cc
