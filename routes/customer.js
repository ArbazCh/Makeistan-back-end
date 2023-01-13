const { application } = require("express");
const router = require("express").Router();
const {
  getOrderById,
  createOrder,
  cancelOrder,
} = require("../controllers/userController");

router.route("/:id").get(getOrderById);

router.route("/create").post(createOrder);

router.route("/:id").put(cancelOrder);

module.exports = router;
