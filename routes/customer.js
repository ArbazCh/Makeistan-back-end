const { application } = require("express");
const router = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
} = require("../controllers/userController");

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router.post("/orders/create", createOrder);

router.put("/orders/:id", cancelOrder);

module.exports = router;
