const router = require("express").Router();

const admin = require("./admin");
const seller = require("./seller");

router.use("/admin", admin);
router.use("/seller", seller);


module.exports = router;



