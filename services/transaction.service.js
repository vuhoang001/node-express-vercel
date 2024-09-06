const transactionModel = require("../models/transaction.model");
const categoryModel = require("../models/categories.model");
const { getDateRange } = require("../helpers/getDateRange");
const { Types } = require("mongoose");
const { BdRstError } = require("../core/error.response");
const { getDayofMonth } = require("../utils/index.util");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class TransactionService {
  getAll = async (month, year, id, uid) => {
    if (!uid) throw new BadRequestError("Error: Missing uid");

    let query = {};

    if (id) {
      query._id = new Types.ObjectId(id);
    }

    if (!month && year) {
      const startOfYear = new Date(`${year}-01-01T17:00:00.000Z`);
      const endOfYear = new Date(`${year}-12-30T17:00:00.000Z`);
      query.transaction_date_iso = {
        $gte: startOfYear,
        $lte: endOfYear,
      };
    }

    if (month && year) {
      const { startDate, endDate } = getDayofMonth(+month, +year);
      query.transaction_date_iso = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    query.uid = new Types.ObjectId(uid);

    const data = await transactionModel.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "Categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
    ]);

    return data;
  };

  create = async (payload, uid) => {
    if (!uid) throw new BadRequestError("Error: Missing uid");
    const { transaction_amount, transaction_type, category } = payload;
    if (!transaction_amount || !transaction_type || !category)
      throw new NotFoundError("Error: Missing required fileds");
    const data = await transactionModel.create({
      transaction_amount: Number(payload.transaction_amount),
      transaction_description: payload.transaction_description,
      transaction_type: payload.transaction_type,
      transaction_date: payload.transaction_date,
      category: payload.category,
      uid: uid,
    });
    if (!data) throw new BadRequestError("Something went wrong! Cant creat");
    return data;
  };

  edit = async (id, payload) => {
    if (!id) throw new BadRequestError("Error: Missing id");
    const holder = await transactionModel.findOne({ _id: id });
    if (!holder) throw new NotFoundError("Cant found transaction");
    const data = await transactionModel.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });

    if (!data) throw new BadRequestError("Cant edit transaction!");
    return data;
  };

  delete = async (id) => {
    const holder = await transactionModel.findOne({ _id: id });
    if (!holder) return "Can not find transaction";
    const data = await transactionModel.findOneAndDelete(
      { _id: id },
      { new: true }
    );

    if (!data) throw new BadRequestError("Error: Cant not delete transaction");
    return data;
  };

  statictisc = async (type, value, includeType, transactionType, uid) => {
    uid = new Types.ObjectId(uid);
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
            _id: "$category", // Nhóm theo trường uid
            total: { $sum: "$transaction_amount" }, // Tính tổng số tiền
            count: { $sum: 1 }, // Tính số lượng giao dịch
          },
        },
        {
          $lookup: {
            from: "Categories", // Tên tập hợp Category trong cơ sở dữ liệu
            localField: "_id", // Trường trong Transaction chứa ObjectId
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
            category_name: "$categoryDetails.category_name",
          },
        },
        {
          $project: {
            _id: 0, // Loại bỏ trường _id khỏi kết quả
            category_id: "$_id", // Đổi tên _id thành category_id
            category_name: 1, // Giữ lại trường category_name
            total: 1, // Giữ lại tổng số tiền
            count: 1, // Giữ lại số lượng giao dịch
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

    // Ngày đầu tháng hiện tại
    const startDate = new Date(`${year}-${formattedMonth}-01T00:00:00.000Z`);

    // Ngày đầu tháng tiếp theo
    const endDate = new Date(`${year}-${formattedNextMonth}-01T00:00:00.000Z`);

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

  getTransactionByCategory = async (month, year, uid) => {
    const query = {};

    if (!uid) {
      throw new BdRstError("Error: Cant not find uid");
    }
    uid = new Types.ObjectId(uid);
    query.uid = uid;

    if (month && year) {
      const { startDate, endDate } = getDayofMonth(+month, +year);
      query.transaction_date_iso = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    if (!month && year) {
      const startOfYear = new Date(`${year}-01-01T17:00:00.000Z`);
      const endOfYear = new Date(`${year}-12-30T17:00:00.000Z`);
      query.transaction_date_iso = {
        $gte: startOfYear,
        $lte: endOfYear,
      };
    }

    const data = await transactionModel.aggregate([
      {
        $match: query, // Lọc theo tháng và năm nếu có
      },
      {
        $lookup: {
          from: "Categories",
          localField: "category",
          foreignField: "_id",
          as: "CategoryDetail",
        },
      },
      {
        $unwind: {
          path: "$CategoryDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$CategoryDetail._id", // Nhóm theo ID của danh mục
          category_name: { $first: "$CategoryDetail.category_name" }, // Lấy tên danh mục từ tài liệu đầu tiên
          category_color: { $first: "$CategoryDetail.category_color" }, // Lấy màu sắc danh mục từ tài liệu đầu tiên
          category_icon: { $first: "$CategoryDetail.category_icon" }, // Lấy màu sắc danh mục từ tài liệu đầu tiên
          category_type: { $first: "$CategoryDetail.category_type" }, // Lấy màu sắc danh mục từ tài liệu đầu tiên
          transactions: {
            // Bao gồm thông tin giao dịch
            $push: {
              transaction_id: "$_id",
              transaction_amount: "$transaction_amount",
              transaction_description: "$transaction_description",
              transaction_date: "$transaction_date",
              transaction_type: "$transaction_type",
              transaction_date_iso: "$transaction_date_iso",
            },
          },
        },
      },
      {
        $project: {
          _id: 1, // Loại bỏ trường _id của nhóm
          category_name: 1, // Trả về tên danh mục
          category_color: 1, // Trả về màu sắc danh mục
          category_icon: 1,
          category_type: 1,
          transactions: 1, // Trả về thông tin giao dịch
        },
      },
    ]);

    return data;
  };

  DontClick = async () => {
    const delOne = await transactionModel.deleteMany({ new: true });
    if (!delOne) throw new BadRequestError("Cant delete all");
    const delTwo = await categoryModel.deleteMany({ new: true });
    if (!delTwo) throw new BadRequestError("Cant delete all2");
    return 1;
  };
}

module.exports = new TransactionService();
