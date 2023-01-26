const { application } = require("express");
const router = require("express").Router();
<<<<<<< HEAD
const {registerCustomer,loginCustomer}=require('../controllers/customerController')

//for register\
router.post("/register", registerCustomer)
  // for login
// router.post("/login", loginCustomer);

module.exports=router
  
  
=======
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
  authorize,
  orderValidator,
} = require("../utils/validators/customerValidator");
// const { authorize } = require("../utils/validators/customerValidator");

router.post("/register", registerValidator, registerCustomer);

router.post("/login", loginValidator, loginCustomer);

router.get("/orders", authorize, getAllOrders);

router.get("/orders/:orderId", authorize, getOrderById);

router.post("/orders/create", authorize, orderValidator, createOrder);

router.put("/orders/cancel/:orderId", authorize, cancelOrder);

module.exports = router;
>>>>>>> 4b2d9f0243d446c0e7949011b25b22f39be01616
