const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const a = 20;
  const b = 15;
  if (true) {
    throw new Error("Invalid");
  }
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

module.exports = router;
