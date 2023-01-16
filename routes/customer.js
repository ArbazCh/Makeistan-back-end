const { application } = require("express");
const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
} = require("../controllers/userController");

const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/customerValidator");
const { auth } = require("../utils/validators/customerValidator");

router.post("/register", registerValidator, registerCustomer);

router.post("/login", loginValidator, loginCustomer);

router.get("/orders", auth, getAllOrders); //TODO Auth is not working.

router.get("/orders/:orderId", auth, getOrderById);

router.post("/orders/create", auth, createOrder); //TODO orderValidator is yet to be defined

router.put("/orders/cancel/:orderId", auth, cancelOrder);

module.exports = router;
