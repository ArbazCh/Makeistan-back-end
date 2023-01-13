const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.HOST_PORT || 5000;
const dbConfig = require("./db.config");
const routes = require("./routes");
const { getAllOrders } = require("./controllers/userController"); //for test only
app.use(express.json());
app.use("/api", routes);

//get allorders for test

app.get("/", getAllOrders);

app.listen(PORT, () => {
  console.log("Server is Listenig at Port: ", PORT);
});
