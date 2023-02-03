const express = require("express");
require("dotenv").config();
<<<<<<< HEAD
const cors = require('cors')
=======
const cors = require("cors");
>>>>>>> db75deaf69a97a3fe784a863fce7486d8b62e3cc
const app = express();
const PORT = process.env.HOST_PORT || 5000;
const routes = require("./routes");
app.use(cors());

app.use(express.json());
app.use(cors())

app.use("/api", routes);

app.get("/", (req, res) => {
<<<<<<< HEAD
  res.send("<h1 style='text-align: center'>Makeistan</h1>");
=======
  res.send(`<h1 style='text-align: center'>MAKEISTAN</h1>`);
>>>>>>> db75deaf69a97a3fe784a863fce7486d8b62e3cc
});

app.listen(PORT, () => {
  console.log("Server is Listening at Port: ", PORT);
});
