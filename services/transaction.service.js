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

  create = async (payload, uid) => {
    const data = await transactionModel.create({
      transaction_amount: Number(payload.transaction_amount),
      transaction_description: payload.transaction_description,
      transaction_type: payload.transaction_type,
      category: payload.category,
      uid: uid,
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

  statictisc = async (type, value, includeType, transactionType, uid) => {
    const matchCriteria = { uid };

    // Xử lý phạm vi thời gian nếu có
    if (type && value) {
      const time = getDateRange(type, value);
      matchCriteria.createdAt = {
        $gte: time.startDate,
        $lte: time.endDate,
      };
    }

    // Thêm điều kiện loại giao dịch nếu yêu cầu
    if (includeType && transactionType) {
      matchCriteria.transaction_type = transactionType;
    }

    console.log("Match Criteria:", matchCriteria);

    try {

      const result = await transactionModel.aggregate([
        { $match: matchCriteria },
        {
          $group: {
            _id: "$uid", // Nhóm theo trường uid
            totalIncome: { $sum: "$transaction_amount" }, // Tính tổng số tiền
            count: { $sum: 1 }, // Tính số lượng giao dịch
          },
        },
      ]);

      if (result.length === 0) {
        return [{ _id: uid, totalIncome: 0, count: 0 }];
      }

      return result;
    } catch (error) {
      console.error("Error in statistics method:", error);
      throw new Error("Failed to fetch statistics");
    }
  };
}

module.exports = new TransactionService();
