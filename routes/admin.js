const { application } = require("express");
const router = require("express").Router();
const { authorize } = require("../utils/validators/customerValidator");
const {
  getAllCategories,
  getCategoryById,
  UpdateCategoryById,
  CreateCategory,
  getAllOrders,
  getOrdersBySellerId,
  getOrdersByCustomerId,
} = require("../controllers/adminController");

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

module.exports = router;

//TODO unit Testing

router.get("/orders", authorize, getAllOrders);

router.get("/orders/:orderId", authorize, getOrdersBySellerId);

router.get("/orders/:orderId", authorize, getOrdersByCustomerId);

module.exports = router;
