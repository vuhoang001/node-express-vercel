const { SuccessResponse } = require("../core/success.response");

const UserService = require("../services/user.service");

class UserController {
  getUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Get list success!",
      metadata: await UserService.getAll(),
    }).send(res);
  };

  createUser = async (req, res, next) => {
    new SuccessResponse({
      message: "Created success!",
      metadata: await UserService.createUser(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    const data = await UserService.login(req.body);
    return res.json(data);
  };

  handleforgetPassword = async (req, res, next) => {
    new SuccessResponse({
      message: "Request to forget password!",
      metadata: await UserService.handleForgetPassword(req.body),
    }).send(res);
  };

  update = async (req, res, next) => {
    new SuccessResponse({
      message: "Change password success!",
      metadata: await UserService.update(req.uid, req.body),
    }).send(res);
  };

  sendOTP = async (req, res, next) => {
    new SuccessResponse({
      message: "Send OTP succeess!",
      metadata: await UserService.sendOTP(req.uid),
    }).send(res);
  };

  handleOTP = async (req, res, next) => {
    const { otp } = req.body;
    new SuccessResponse({
      message: "Handle OTP success!",
      metadata: await UserService.handleOTP(req.uid, otp),
    }).send(res);
  };
}

module.exports = new UserController();
