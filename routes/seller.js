const { application } = require("express");
const router = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  completeOrder,
  cancelOrder,
} = require("../controllers/sellerController");

router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrderById);

// router.post("/orders/complete", completeOrder);

// router.put("/orders/:id", cancelOrder);

module.exports = router;
