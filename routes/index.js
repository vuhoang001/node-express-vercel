const express = require("express");

const router = express.Router();

router.use("/home", require("./home"));
router.use("/", require("./user.route"));
router.use("/category", require("./categories.route"));
router.use("/", require("./transaction.route"));

module.exports = router;
