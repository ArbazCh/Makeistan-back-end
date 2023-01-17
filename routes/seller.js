const { application } = require("express");
const router = require("express").Router();
const { authorize } = require("../utils/validators/customerValidator");
const {
  getAllOrders,
  getOrderById,
  completeOrder,
  cancelOrder,
} = require("../controllers/sellerController");

//TODO unit Testing
router.get("/orders", authorize, getAllOrders);

router.get("/order/:orderId", authorize, getOrderById);

router.put("/order/complete/:orderId", authorize, completeOrder);

router.put("/orders/cancel/:orderId", authorize, cancelOrder);

module.exports = router;
