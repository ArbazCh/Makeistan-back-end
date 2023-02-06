const { application } = require("express");
const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  forgetP,
} = require("../controllers/customerController");
const {
  getAllProductsForCustomer,
  getProductForCustomerById,
} = require("../controllers/sellerController");

const {
  registerValidator,
  loginValidator,
  customerAuthorize,
  orderValidator,
} = require("../utils/validators/customerValidator");
// const { authorize } = require("../utils/validators/customerValidator");

router.post("/register", registerCustomer); // registerValidator,
router.post("/login", loginCustomer); // loginValidator,
router.get("/orders", customerAuthorize, getAllOrders);
router.get("/orders/:orderId", customerAuthorize, getOrderById);
router.post("/orders/create", customerAuthorize, orderValidator, createOrder);
router.put("/forgetpassword", forgetP);
router.put("/orders/cancel/:orderId", customerAuthorize, cancelOrder);
router.get("/product", getAllProductsForCustomer); //customerAuthorize
router.get("/product/:id", getProductForCustomerById);

module.exports = router;
