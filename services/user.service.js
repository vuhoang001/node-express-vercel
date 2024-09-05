const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { unSelectedObject } = require("../utils/index.util");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
class UserService {
  getAll = async () => {
    const data = await userModel.find().select("-password -__v");
    return data;
  };

  createUser = async ({ username, password, gmail, phone }) => {
    const holderAccount = await userModel.findOne({ username: username });
    if (holderAccount) throw new AuthFailureError("Error: Account is registed");

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword)
      throw new BadRequestError("Something went wrong - create");

    const newAccount = await userModel.create({
      username,
      password: hashedPassword,
      gmail,
      phone,
    });

    if (!newAccount) throw new BadRequestError("Failed to create account");

    return data;
  };

  login = async ({ username, password }) => {
    const holderAccount = await userModel.findOne({ username });
    if (!holderAccount)
      throw new AuthFailureError("Account or password is wrong!");

    const matchPassword = await bcrypt.compare(
      password,
      holderAccount.password
    );

    if (!matchPassword)
      throw new AuthFailureError("Account or password is wrong!");

    const metadata = unSelectedObject(holderAccount.toObject(), [
      "password",
      "__V",
    ]);

    return metadata;
  };

  // forgetPassword = async ({ username, email }) => {
  //   const holderAccount = await userModel.findOne({ username });
  //   if (!holderAccount) return "Account is not registed!";
  // };
}

module.exports = new UserService();
