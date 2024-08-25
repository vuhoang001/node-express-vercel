const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Transaction";
const COLLECTION_NAME = "Transactions";

const TransactionSchema = new Schema(
  {
    transaction_amount: {
      type: Number,
      required: true,
    },
    transaction_description: {
      type: String,
      default: "",
    },
    transaction_type: {
      type: String,
      enum: ["income", "outcome"],
      required: true,
    },
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, TransactionSchema);
