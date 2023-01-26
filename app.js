const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.DEV_PORT || 5000;
const routes = require("./routes");
app.use(express.json());



app.use("/api", routes);




app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Makeistan</h1>");
});



app.listen(PORT, () => {
  console.log("Server is Listenig at Port: ", PORT);
});
