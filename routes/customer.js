const { application } = require("express");
const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
} = require("../controllers/customerController");

const {
  registerValidator,
  loginValidator,
  customerAuthorize,
  orderValidator,
} = require("../utils/validators/customerValidator");
// const { authorize } = require("../utils/validators/customerValidator");

router.post("/register", registerValidator, registerCustomer);

router.post("/login", loginValidator, loginCustomer);

router.get("/orders", customerAuthorize, getAllOrders);

router.get("/orders/:orderId", customerAuthorize, getOrderById);

router.post("/orders/create", customerAuthorize, orderValidator, createOrder);

router.put("/orders/cancel/:orderId", customerAuthorize, cancelOrder);

module.exports = router;
