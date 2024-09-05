const transactionService = require("../services/transaction.service");
const { SuccessResponse } = require("../core/success.response");

class TransactionController {
  getAll = async (req, res, next) => {
    const uid = req.uid;
    const year = req.query.year;
    const month = req.query.month;
    const id = req.query.transaction_id;
    new SuccessResponse({
      message: "Get all success!",
      metadata: await transactionService.getAll(month, year, id, uid),
    }).send(res);
  };

  getTransactionByCategory = async (req, res, next) => {
    const uid = req.uid;
    const year = req.query.year;
    const month = req.query.month;
    new SuccessResponse({
      message: "Success",
      metadata: await transactionService.getTransactionByCategory(
        month,
        year,
        uid
      ),
    }).send(res);
  };

  create = async (req, res, next) => {
    const uid = req.uid;
    new SuccessResponse({
      message: "Create success!",
      metadata: await transactionService.create(req.body, uid),
    }).send(res);
  };

  edit = async (req, res, next) => {
    const id = req.query.transaction_id;
    new SuccessResponse({
      message: "Edit success",
      metadata: await transactionService.edit(id, req.body),
    }).send(res);
  };

  delete = async (req, res, next) => {
    const id = req.query.transaction_id;

    new SuccessResponse({
      message: "Delete success!",
      metadata: await transactionService.delete(id),
    }).send(res);
  };

  getStatistics = async (req, res, next) => {
    const type = req.query.type;
    const value = req.query.value;
    const transactionType = req.query.transactionType;
    const includeType = req.query.includeType || false;
    const uid = req.uid;

    try {
      const data = await transactionService.statictisc(
        type,
        value,
        includeType,
        transactionType,
        uid
      );
      if (data.lenth === 0) return res.status(404).json("No data!");

      return res.status(200).json(data);
    } catch (error) {
      return res.status(501).json("Internal server");
    }
  };

  getStaticCalander = async (req, res, next) => {
    const uid = req.uid;
    const month = req.query.month;
    const year = req.query.year;
    if (!month || !year) {
      return res.status(404).json({ message: "Missing time!" });
    }

    try {
      // Lấy dữ liệu từ dịch vụ
      const data = await transactionService.staticCalander(+month, +year, uid);

      // Kiểm tra xem dữ liệu có rỗng không
      if (data.length === 0) {
        return res.status(404).json({
          message: "No transactions found for the given month and year.",
        });
      }

      // Trả về dữ liệu nếu mọi thứ ổn
      return res.status(200).json(data);
    } catch (error) {
      // Xử lý lỗi và trả về lỗi cho client
      console.error("Error fetching calendar data:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  DontClick = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete all transaction and category",
      metadata: await transactionService.DontClick(),
    }).send(res);
  };
}

module.exports = new TransactionController();
