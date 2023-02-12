const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.HOST_PORT || 5000;
const routes = require("./routes");
app.use(cors());

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send(`<h1 style='text-align: center'>MAKEISTAN</h1>`);
});

app.listen(PORT, () => {
  console.log("Server is Listening at Port: ", PORT);
});
