const { application } = require("express");
const express = require("express");
const userRoute = express.Router();
const {
  get_all_Orders,
  get_orderby_Id,
  create_Order,
  cancel_Order,
} = require("../controllers/userController");

//Get all the orders
userRoute.get("/", get_all_Orders);
//Get orders by order ID
userRoute.get("/:id", get_orderby_Id);
//Create Order
userRoute.post("/", create_Order);
//Cancle order
userRoute.post("/:id", cancel_Order);

module.exports = userRoute;
