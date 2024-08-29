const { model, Schema, Types } = require("mongoose");
const {
  convertToISODate,
  adjustToVietnamTime,
} = require("../utils/index.util");
const DOCUMENT_NAME = "Transaction";
const COLLECTION_NAME = "Transactions";

const TransactionSchema = new Schema(
  {
    transaction_amount: {
      type: Number,
    },
    transaction_description: {
      type: String,
      default: "",
    },
    transaction_type: {
      type: String,
      enum: ["income", "outcome"],
    },
    transaction_date: {
      type: String,
      default: "",
    },
    transaction_date_iso: {
      type: Date,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    uid: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

TransactionSchema.pre("save", function (next) {
  if (this.transaction_date) {
    const date = convertToISODate(this.transaction_date);
    this.transaction_date_iso = date;
  }
  next();
});

module.exports = model(DOCUMENT_NAME, TransactionSchema);
