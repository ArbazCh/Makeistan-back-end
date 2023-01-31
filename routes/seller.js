const { application } = require("express");
const express = require("express");
const {
  validations,
  productValidations,
  sellerAuthorize,
} = require("../utils/validators/sellerValidators");
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


router.post("/signup", validations, sellerSignup);

router.post("/login", sellerAuthorize, sellerLogin);

router.get("/sellerProfile", sellerAuthorize, getSellerProfile);

router.get("/product", sellerAuthorize, getAllProduct);

router.post(
  "/product/addProduct",
  productValidations,
  sellerAuthorize,
  addProduct
);

router.put("/product/:id", productValidations, sellerAuthorize, updateProduct);

router.get("/product/:id", authorize, getSellerProductDetailById);

router.delete("/product/:id", sellerAuthorize, deleteProduct);


router.get("/product/:id", sellerAuthorize, productDetail); //Validate seller

//TODO unit Testing
router.get("/orders", sellerAuthorize, getAllOrders);

router.get("/order/:orderId", sellerAuthorize, getOrderById);

router.put("/order/complete/:orderId", sellerAuthorize, completeOrder);

router.put("/orders/cancel/:orderId", sellerAuthorize, cancelOrder);

module.exports = router;
