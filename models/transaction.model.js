const { model, Schema, Types } = require("mongoose");

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
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    uid: {
      type: Types.ObjectId, 
      ref: "User"
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, TransactionSchema);
