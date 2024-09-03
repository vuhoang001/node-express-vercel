const transactionModel = require("../models/transaction.model");



class ReportService {
  test = async () => {
    const data = await transactionModel.find();
    return data
  };
}

module.exports = new ReportService();
