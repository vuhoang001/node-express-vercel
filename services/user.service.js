const userModel = require("../models/user.model");

class UserService {
  getAll = async () => {
    const data = await userModel.find();
    return data;
  };
}

module.exports = new UserService();
