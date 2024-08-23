const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const ColumnSchema = new Schema(
  {
    user_name: {
      type: String,
      default: "Username1",
    },
    user_description: {
      type: String,
      default: "user_description",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, ColumnSchema);
