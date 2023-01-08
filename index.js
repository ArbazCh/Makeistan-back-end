const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.HOST_PORT || 5000;

/**
 * ? Middleware
 */
app.use(express.json());

/**
 * ? Router
 */

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is Listenig at Port: ", PORT);
});
