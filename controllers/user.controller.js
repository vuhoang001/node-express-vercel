const UserService = require("../services/user.service");

class UserController {
  getUser = async (req, res, next) => {
    const data = await UserService.getAll();
    return res.json(data);
  };

  createUser = async (req, res, next) => {
    const data = await UserService.createUser();
    return res.status(200).json(data);
  };
}

module.exports = new UserController();
