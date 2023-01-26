const express = require("express");
require("dotenv").config();
const app = express();

const cors = require("cors");

const routes = require("./routes");

const PORT = process.env.DEV_PORT;

//middleware

app.use(express.json());
app.use(cors());

//seller Routes
app.use("/api", routes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});

