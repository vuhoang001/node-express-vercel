const userModel = require("../models/user.model");

class UserService {
  getAll = async () => {
    const data = await userModel.find();
    return data;
  };

  createUser = async (
    user_name = "username",
    user_description = "user_description"
  ) => {
    const data = await userModel.create({ user_name, user_description });
    return "Create success";
  };
}

module.exports = new UserService();
