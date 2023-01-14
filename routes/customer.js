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

router.post("/register", registerValidator, registerCustomer);

router.post("/login", loginValidator, loginCustomer);

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.post("/orders/create", createOrder);

router.put("/orders/:id", cancelOrder);

module.exports = router;
