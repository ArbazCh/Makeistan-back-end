const { application } = require("express");
const router = require("express").Router();
const { authorize } = require("../utils/validators/customerValidator");

//TODO unit Testing

router.get("/orders", authorize, getAllOrders);

router.get("/orders/:orderId", authorize, getOrderBySellerId);

router.get("/orders/:orderId", authorize, getOrderByCustomerId);

module.exports = router;
