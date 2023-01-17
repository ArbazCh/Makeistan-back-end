const router = require("express").Router();
const pool = require("../db.config")
const { application } = require("express");
const {getAllCategories,
getCategoryById,UpdateCategoryById,CreateCategory} = require("./Controllers/adminController");

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

module.exports = router;


// router.get("/orders", auth, getAllOrders); //TODO Auth is not working.

// router.get("/orders/:id", auth, getOrderBySellerId);

// router.get("/orders/:id", auth, getOrderByCustomerId);

// router.post("/orders/cancel", auth, cancelOrder); //TODO orderValidator is yet to be defined

module.exports = router;
