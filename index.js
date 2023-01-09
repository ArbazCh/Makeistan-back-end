const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.HOST_PORT || 5000;

const userRoute = require("./router/userRoute");

app.listen(PORT, () => {
  console.log("Server is Listenig at Port: ", PORT);
});
