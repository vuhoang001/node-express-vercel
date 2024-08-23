const mongoose = require("mongoose");

const connectString = process.env.MONGODB_URI;

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
