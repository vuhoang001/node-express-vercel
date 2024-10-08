const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Category";
const COLLECTION_NAME = "Categories";

const CategorySchema = new Schema(
  {
    category_name: {
      type: String,
      default: "",
    },
    category_icon: {
      type: String,
      default: "",
    },
    category_type: {
      type: String,
      enum: ["income", "outcome"],
    },
    category_color: {
      type: String,
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

module.exports = model(DOCUMENT_NAME, CategorySchema);
