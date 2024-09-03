const express = require("express");
const router = express.Router();
const AsyncHanlde = require("../helpers/AsyncHandle");
const HomeController = require("../controllers/home.controller");
router.get("/", AsyncHanlde(HomeController.home));

module.exports = router;
