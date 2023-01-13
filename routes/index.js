const router = require("express").Router();

const admin = require("./admin");
const customer = require("./customer");
const seller = require("./seller");

router.route("/admin", admin);
router.route("/seller", seller);
router.route("/customer", customer);

module.exports = router;
