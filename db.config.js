//Azure DB
const Pool = require("pg").Pool;
require("dotenv").config();

const dbConfig = new Pool({
  host: "makeistan.postgres.database.azure.com",
  port: 5432,
  database: "makeistandb",
  user: "makeistan",
  password: "090078601niais.",
  ssl: {
    rejectUnauthorized: false,
  },
});

dbConfig
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Failed to connect to the database", err));

module.exports = dbConfig;

//// Local Machine DB essentials

// const Pool = require("pg").Pool;
// require("dotenv").config();

// const dbConfig = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DATABASE,
// });

// dbConfig.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// module.exports = dbConfig;
