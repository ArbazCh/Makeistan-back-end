const { application } = require("express");
const router = require("express").Router();
const { authorize } = require("../utils/validators/customerValidator");
const {
  getAllCategories,
  getCategoryById,
  UpdateCategoryById,
  CreateCategory,
} = require("./Controllers/adminController");

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

module.exports = router;

//TODO unit Testing

router.get("/orders", authorize, getAllOrders);

router.get("/orders/:orderId", authorize, getOrderBySellerId);

router.get("/orders/:orderId", authorize, getOrderByCustomerId);

module.exports = router;
