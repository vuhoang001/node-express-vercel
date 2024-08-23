const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://vuhoang250203:2nc63AvbW76HKWBK@trackingmoney.8drhd.mongodb.net/?retryWrites=true&w=majority&appName=TrackingMoney";

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.set("debug", true);

    mongoose
      .connect(connectString, {
        maxPoolSize: 10,
      })
      .then(() => {
        console.log("Connect db success!");
      })
      .catch((err) => {
        console.error("Connect db error:", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDatabase = Database.getInstance();

module.exports = instanceDatabase;
