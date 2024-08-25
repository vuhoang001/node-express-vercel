const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
class UserService {
  getAll = async () => {
    const data = await userModel.find();
    return data;
  };

  createUser = async ({ username, password, gmail, phone }) => {
    const holderAccount = await userModel.findOne({ username: username });
    if (holderAccount) return "Account is registed!";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await userModel.create({
      username,
      password: hashedPassword,
      gmail,
      phone,
    });

    if (!newAccount) return "Registed failed!";
    return "Create success";
  };

  login = async ({ username, password }) => {
    const holderAccount = await userModel.findOne({ username });
    if (!holderAccount) return "Account or password is wrong!";

    const matchPassword = await bcrypt.compare(
      password,
      holderAccount.password
    );

    if (!matchPassword) return "Account or password is wrong!";

    return "Login successfully!";
  };
}

module.exports = new UserService();
