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
}

module.exports = new UserController();
