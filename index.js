// Import packages
const express = require("express");
const home = require("./routes/home");

const app = express();
app.use(express.json());

require("./database/init.mongo");
app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 501;
  return res.status(status).json({
    status: "Error",
    code: status,
    message: err.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
