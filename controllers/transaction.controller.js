const transactionService = require("../services/transaction.service");
const { getDateRange } = require("../helpers/getDateRange");
class TransactionController {
  getAll = async (req, res, next) => {
    const id = req.query.transaction_id;
    const { uid } = req.body;
    const data = await transactionService.getAll(id, uid);
    return res.json(data);
  };

  create = async (req, res, next) => {
    try {
      const {
        transaction_amount,
        transaction_description,
        transaction_type,
        category,
      } = req.body;
      if (!transaction_amount || !transaction_type || !category) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const data = await transactionService.create(req.body);
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

    const data = await transactionService.statictisc(
      type,
      value,
      includeType,
      transactionType
    );
    return res.json(data);
  };
}

module.exports = new TransactionController();
