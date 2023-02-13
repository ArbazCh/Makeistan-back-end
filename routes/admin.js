const router = require("express").Router();
const { application } = require("express");
const {getAllCategories,
getCategoryById,UpdateCategoryById,CreateCategory,
deleteCategoryById, adminLogin} = require("../controllers/adminController");

//  router.post("/register",registerLogin)

router.post("/login",adminLogin)

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

router.delete("/category/:id",deleteCategoryById)

module.exports = router;


router.get("/orders", getAllOrders); //TODO Auth is not working.

router.get("/orders/:id", getOrderBySellerId);

router.get("/orders/:id", getOrderByCustomerId);

router.post("/orders/cancel", cancelOrder); //TODO orderValidator is yet to be defined

 module.exports = router;
