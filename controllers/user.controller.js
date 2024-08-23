const UserService = require("../services/user.service");

class UserController {
  getUser = async (req, res, next) => {
    const data = await UserService.getAll();
    return res.json(data);
  };
}

module.exports = new UserController();
