const { application } = require("express");
const router = require("express").Router();

router.get("/orders", auth, getAllOrders); //TODO Auth is not working.

router.get("/orders/:id", auth, getOrderById);

router.post("/orders/complete", auth, completeOrder); //TODO orderValidator is yet to be defined

router.put("/orders/:id", auth, cancelOrder);

module.exports = router;
