const transactionModel = require("../models/transaction.model");
const { getDateRange } = require("../helpers/getDateRange");
const { Types } = require("mongoose");
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

  staticCalander = async (month, year, uid) => {
    const formattedMonth = String(month).padStart(2, "0");

    const nextMonth = month === 12 ? 1 : month + 1;
    const formattedNextMonth = String(nextMonth).padStart(2, "0");

    const startDate = new Date(`${year}-${formattedMonth}-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-${formattedNextMonth}-01T00:00:00.000Z`);

    // const data = await transactionModel.aggregate([
    //   {
    //     $match: {
    //       createdAt: {
    //         $gte: startDate, // Ngày đầu tháng
    //         $lt: endDate, // Ngày đầu tháng sau
    //       },
    //     },
    //   },

    //   {
    //     $group: {
    //       _id: {
    //         date: {
    //           $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
    //         },
    //       },
    //       transactions: {
    //         $push: {
    //           transaction_id: "$_id",
    //           transaction_amount: "$transaction_amount",
    //           transaction_description: "$transaction_description",
    //           transaction_type: "$transaction_type",
    //           category: "$category",
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       $lookup: {
    //         from: "Categories", // Tên tập hợp Category trong cơ sở dữ liệu
    //         localField: "category", // Trường trong Transaction chứa ObjectId
    //         foreignField: "_id", // Trường trong Category chứa ObjectId
    //         as: "categoryDetails", // Tên trường mới để chứa thông tin kết hợp
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$_id.date",
    //       transactions: { $push: "$transactions" },
    //     },
    //   },
    //   {
    //     $sort: { _id: 1 }, // Sắp xếp kết quả theo ngày
    //   },
    // ]);

    uid = new Types.ObjectId(uid);
    const transactions2 = await transactionModel.aggregate([
      {
        $match: {
          uid: uid,
          createdAt: {
            $gte: startDate, // Ngày đầu tháng
            $lt: endDate, // Ngày đầu tháng sau
          },
        },
      },
      {
        $lookup: {
          from: "Categories", // Tên tập hợp Category trong cơ sở dữ liệu
          localField: "category", // Trường trong Transaction chứa ObjectId
          foreignField: "_id", // Trường trong Category chứa ObjectId
          as: "categoryDetails", // Tên trường mới để chứa thông tin kết hợp
        },
      },
      {
        $unwind: {
          path: "$categoryDetails", // Giải nén mảng categoryDetails
          preserveNullAndEmptyArrays: true, // Đảm bảo không bị loại bỏ nếu không có kết quả tìm thấy
        },
      },
      {
        $addFields: {
          category: "$categoryDetails", // Thay thế trường category bằng categoryDetails
        },
      },
      {
        $project: {
          categoryDetails: 0, // Loại bỏ trường categoryDetails
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          }, // Nhóm theo ngày
          totalAmount: { $sum: "$transaction_amount" }, // Tổng số tiền giao dịch trong ngày
          transactions: {
            $push: {
              transaction_id: "$_id",
              transaction_amount: "$transaction_amount",
              transaction_description: "$transaction_description",
              transaction_type: "$transaction_type",
              category: "$category",
            },
          }, // Danh sách các giao dịch trong ngày
        },
      },
    ]);
    return transactions2;
  };
}

module.exports = new TransactionService();
