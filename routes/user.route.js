const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AsyncHandle = require("../helpers/AsyncHandle");

router.get("/user", AsyncHandle(UserController.getUser));
router.post("/register", AsyncHandle(UserController.createUser));
router.post("/login", AsyncHandle(UserController.login));
router.post(
  "/forget-password",
  AsyncHandle(UserController.handleforgetPassword)
);
router.post("/change-password", AsyncHandle(UserController.update));
module.exports = router;
