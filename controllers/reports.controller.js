const { SuccessResponse } = require("../core/success.response");
const ReportService = require("../services/reports.service");
class ReportController {
  test = async (req, res, next) => {
    new SuccessResponse({
      message: "Success",
      metadata: await ReportService.test(),
    }).send(res);
  };
}

module.exports = new ReportController();
