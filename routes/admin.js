const express = require("express");
const router = require("express").Router();

const { authorize } = require("../utils/validators/sellerValidators")

const {  getAllSellers } = require("../controllers/adminController");



router.get("/", getAllSellers);

module.exports = router; 