const transactionModel = require("../models/transaction.model");
const { getDateRange } = require("../helpers/getDateRange");
class TransactionService {
  getAll = async (id, uid) => {
    let query = {};

    if (id) {
      query._id = id;
    }

    if (!uid) {
      return "Get data failed";
    }

    query.uid = uid;

    const data = await transactionModel.find(query);
    return data;
  };

  create = async (payload) => {
    const data = await transactionModel.create({
      transaction_amount: Number(payload.transaction_amount),
      transaction_description: payload.transaction_description,
      transaction_type: payload.transaction_type,
      category: payload.category,
    });
    return data;
  };

  edit = async (id, payload) => {
    const holder = await transactionModel.findOne({ _id: id });
    if (!holder) return "Can not find transaction";
    const data = await transactionModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return data;
  };

  delete = async (id) => {
    const holder = await transactionModel.findOne({ _id: id });
    if (!holder) return "Can not find transaction";
    const data = await transactionModel.findOneAndDelete(
      { _id: id },
      { new: true }
    );

    return data;
  };

  statictisc = async (type, value, includeType, transactionType) => {
    const matchCriteria = {};
    let time;

    if (type && value) {
      time = getDateRange(type, value);
      matchCriteria.createdAt = {
        $gte: time.startDate,
        $lte: time.endDate,
      };
    }

    if (includeType) {
      matchCriteria.transaction_type = transactionType;
    }

    const result = await transactionModel.aggregate([
      {
        $match: matchCriteria,
      },
      {
        $group: {
          _id: null, // Không phân nhóm theo trường nào
          totalIncome: { $sum: "$transaction_amount" }, // Tính tổng số tiền
        },
      },
    ]);
    return result;
  };
}

module.exports = new TransactionService();
