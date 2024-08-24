const userModel = require("../models/user.model");

class UserService {
  getAll = async () => {
    const data = await userModel.find();
    return data;
  };

  createUser = async (user_name = "Nhat Linh", user_description = "cute") => {
    const data = await userModel.create({ user_name, user_description });
    return "Create success";
  };
}

module.exports = new UserService();
