const express = require("express");
const {validations, productValidations, authorize} = require("../utils/validators/sellerValidators")
const { application } = require("express");
const router = require("express").Router();
const {
    sellerSignup,
    sellerLogin,
    getSellerProfile,
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getSellerProductDetailById,
    getAllOrders,
    getOrderById,
    completeOrder,
    cancelOrder,
    }
     = require("../controllers/sellerController");


router.post('/signup', validations, sellerSignup);

router.post('/login',authorize,  sellerLogin);

router.get("/sellerProfile", authorize, getSellerProfile);

router.get("/product" , authorize, getAllProduct);

router.post("/product/addProduct", productValidations,authorize,addProduct);

router.put("/product/:id", productValidations, authorize, updateProduct);

router.delete("/product/:id", authorize, deleteProduct);

router.get("/product/:id", authorize, getSellerProductDetailById);


//TODO unit Testing
router.get("/orders", authorize, getAllOrders);

router.get("/order/:orderId", authorize, getOrderById);

router.put("/order/complete/:orderId", authorize, completeOrder);

router.put("/orders/cancel/:orderId", authorize, cancelOrder);

module.exports = router;
