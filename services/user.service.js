const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { unSelectedObject } = require("../utils/index.util");
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

    const data = { data: newAccount, message: "Created successfully!" };
    return data;
  };

  login = async ({ username, password }) => {
    const holderAccount = await userModel.findOne({ username });
    if (!holderAccount) return "Account or password is wrong!";

    const matchPassword = await bcrypt.compare(
      password,
      holderAccount.password
    );

    if (!matchPassword) return "Account or password is wrong!";

    const metadata = unSelectedObject(holderAccount.toObject(), [
      "password",
      "__V",
    ]);
    const data = {
      message: "Login successfully",
      metadata: metadata,
    };
    return data;
  };

  // forgetPassword = async ({ username, email }) => {
  //   const holderAccount = await userModel.findOne({ username });
  //   if (!holderAccount) return "Account is not registed!";
  // };
}

module.exports = new UserService();
