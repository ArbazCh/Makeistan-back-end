const router = require("express").Router();
const pool = require("../db.config")
const {getAllCategories,
getCategoryById,UpdateCategoryById,CreateCategory} = require("./Controllers/adminController");

router.get("/category", getAllCategories);

router.get("/category/:id", getCategoryById);

router.put("/category/:id", UpdateCategoryById);

router.post("/category/create", CreateCategory);

module.exports = router;

