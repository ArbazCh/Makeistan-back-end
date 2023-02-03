const { application } = require("express");
const router = require("express").Router();
const {
  registerCustomer,
  loginCustomer,
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  forgetP
} = require("../controllers/customerController");
const {
  getAllProductsForCustomer,
  getProductForCustomerById 
} = require("../controllers/sellerController");

const {
  registerValidator,
  loginValidator,
  customerAuthorize,
  orderValidator,
} = require("../utils/validators/customerValidator");
// const { authorize } = require("../utils/validators/customerValidator");

router.post("/register",registerCustomer); // registerValidator, 
router.post("/login", loginCustomer); // loginValidator,



router.get("/orders", customerAuthorize, getAllOrders);

router.get("/orders/:orderId", customerAuthorize, getOrderById);

router.post("/orders/create", customerAuthorize, orderValidator, createOrder);

<<<<<<< HEAD
router.put("/orders/cancel/:orderId", authorize, cancelOrder);
router.put("/forgetpassword", forgetP);
=======
router.put("/orders/cancel/:orderId", customerAuthorize, cancelOrder);

router.get("/product" ,customerAuthorize, getAllProductsForCustomer);

router.get("/product/:id", getProductForCustomerById );
>>>>>>> db75deaf69a97a3fe784a863fce7486d8b62e3cc

module.exports = router;
