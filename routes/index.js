const router = require("express").Router();

// const admin = require("./admin");
// const seller = require("./seller");
const customer = require("./customer");

// router.use("/admin", admin);
// router.use("/seller", seller);
router.use("/customer", customer);

module.exports = router;
