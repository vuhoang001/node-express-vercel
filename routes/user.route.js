const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AsyncHandle = require("../helpers/AsyncHandle");

router.get("/user", UserController.getUser);
router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
module.exports = router;
