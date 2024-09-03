const { SuccessResponse } = require("../core/success.response");

class HomeController {
  home = async (req, res, next) => {
    new SuccessResponse({
      message: "Success!",
      metadata: "(),"
    }).send(res);
  };
}

module.exports = new HomeController();
