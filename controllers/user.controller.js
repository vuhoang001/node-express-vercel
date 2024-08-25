const UserService = require("../services/user.service");

class UserController {
  getUser = async (req, res, next) => {
    const data = await UserService.getAll();
    return res.json(data);
  };

  createUser = async (req, res, next) => {
    const data = await UserService.createUser(req.body);
    return res.json(data);
  };

  login = async (req, res, next) => {
    const data = await UserService.login(req.body);
    return res.json(data);
  };
}

module.exports = new UserController();
