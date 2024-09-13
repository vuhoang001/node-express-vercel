const { model, Schema } = require("mongoose");

const DOCUMENT_NAME = "Otp";
const COLLECTION_NAME = "Otps";

const OTPSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });

module.exports = model(DOCUMENT_NAME, OTPSchema);
