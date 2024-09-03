const transactionService = require("../services/transaction.service");

class TransactionController {
  getAll = async (req, res, next) => {
    const uid = req.uid;
    const year = req.query.year;
    const month = req.query.month;
    const id = req.query.transaction_id;
    const data = await transactionService.getAll(month, year, id, uid);
    return res.json(data);
  };

  create = async (req, res, next) => {
    try {
      const { transaction_amount, transaction_type, category } = req.body;
      const uid = req.uid;
      if (!transaction_amount || !transaction_type || !category || !uid) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const data = await transactionService.create(req.body, uid);
      return res.status(201).json(data);
    } catch (error) {
      console.error("Error in create controller:", error);
      next(error);
    }
  };

  edit = async (req, res, next) => {
    try {
      const id = req.query.transaction_id;
      if (!id) return res.json(404).json({ error: "Missing id" });
      const data = await transactionService.edit(id, req.body);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  };

  delete = async (req, res, next) => {
    const id = req.query.transaction_id;
    if (!id) return res.json(404).json({ error: "Missing id" });
    const data = await transactionService.delete(id);
    return res.status(200).json(data);
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
}

module.exports = new TransactionController();
