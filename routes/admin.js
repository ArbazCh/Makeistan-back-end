const express = require("express");
const router = require("express").Router();
const { application } = require("express");
const {
  getAllCategories,
  getCategoryById,
  UpdateCategoryById,
  CreateCategory,
  getAllOrders,
  getOrdersBySellerId,
  getOrdersByCustomerId,
  deleteCategoryById,
  adminLogin,
} = require("../controllers/adminController");
const { customerAuthorize } = require("../utils/validators/customerValidator");
const { sellerAuthorize } = require("../utils/validators/sellerValidators");
const { getAllSellers } = require("../controllers/adminController"); 

//TODO
//  router.post("/register",registerLogin)
router.post("/login",adminLogin)

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

router.delete("/category/:id",deleteCategoryById)

//TODO unit Testing

router.get("/orders", getAllOrders);

router.get("/orders/:orderId", sellerAuthorize, getOrdersBySellerId);

router.get("/orders/:orderId", customerAuthorize, getOrdersByCustomerId);

router.get("/", getAllSellers);

module.exports = router;
