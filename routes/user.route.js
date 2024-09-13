const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const AsyncHandle = require("../helpers/AsyncHandle");
const { checkUid } = require("../middlewares/checkUid.middlewares");
router.post("/register", AsyncHandle(UserController.createUser));
router.post("/login", AsyncHandle(UserController.login));

router.post(
  "/forget-password",
  AsyncHandle(UserController.handleforgetPassword)
);

router.use(checkUid);

router.post("/handle-otp", AsyncHandle(UserController.handleOTP));
router.post("/send-otp", AsyncHandle(UserController.sendOTP));
router.get("/user", AsyncHandle(UserController.getUser));
router.post("/change-password", AsyncHandle(UserController.update));
module.exports = router;
