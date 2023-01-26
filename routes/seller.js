const express = require("express");

const {validations, productValidations, authorize} = require("../utils/validators/sellerValidators")

const {
    sellerSignup,
    sellerLogin,
    getSellerProfile,
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    productDetail,
    }
     = require("../controllers/sellerController");

const router= express.Router();

router.post('/signup', validations, sellerSignup);

router.post('/login',authorize,  sellerLogin);

router.get("/sellerProfile", authorize, getSellerProfile);

router.get("/product" , authorize, getAllProduct);

router.post("/product/addProduct", addProduct);

router.put("/product/:id", productValidations, authorize, updateProduct);

router.delete("/product/:id", authorize, deleteProduct);

router.get("/product/:id", productDetail);

module.exports = router;