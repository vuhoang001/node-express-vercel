const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { unSelectedObject } = require("../utils/index.util");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { sendMail } = require("../config/nodemailer.config");
class UserService {
  getAll = async () => {
    const data = await userModel.find().select("-password -__v");
    return data;
  };

  createUser = async ({ username, password, gmail, phone }) => {
    const holderAccount = await userModel.findOne({ username: username });
    if (holderAccount) {
      throw new AuthFailureError("Error: Account is registed");
    }

    const holderEmail = await userModel.findOne({ gmail: gmail });
    if (holderEmail) {
      throw new AuthFailureError("Account is registed2");
    }

    const newAccount = await userModel.create({
      username,
      password: password,
      gmail,
      phone,
    });

    if (!newAccount) throw new BadRequestError("Failed to create account");

    return "Registed success!";
  };

  login = async ({ username, password }) => {
    const holderAccount = await userModel.findOne({ username });
    if (!holderAccount)
      throw new AuthFailureError("Account or password is wrong!");

    if (password != holderAccount.password)
      throw new AuthFailureError("Account or password is wrong!");

    const metadata = unSelectedObject(holderAccount.toObject(), [
      "password",
      "__V",
    ]);

    return metadata;
  };

  handleForgetPassword = async ({ email }) => {
    const holderAccount = await userModel.findOne({ gmail: email });
    if (!holderAccount)
      throw new AuthFailureError("Error: Account is not registed!");

    const link = `Xin chào ${holderAccount.username}, mật khẩu của bạn là: ${holderAccount.password}`;
    sendMail(email, link);
    return "Handle forget password success!";
  };

  update = async ({ username, newPassword }) => {
    const holderAccount = await userModel.findOne({ username });
    if (!holderAccount) throw new AuthFailureError("Account is not registed!");

    const res = await userModel.findOneAndUpdate(
      { username: username },
      { password: newPassword }
    );

    if (!res) throw new BadRequestError("Something wentwrong!");
    return "Success!";
  };
}

module.exports = new UserService();
