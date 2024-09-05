const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transaction.controller");
const { checkUid } = require("../middlewares/checkUid.middlewares");
const AsyncHandle = require("../helpers/AsyncHandle");

router.use(checkUid);
router.get("/transaction", AsyncHandle(TransactionController.getAll));

router.post("/transaction", AsyncHandle(TransactionController.create));
router.patch("/transaction", AsyncHandle(TransactionController.edit));
router.delete("/transaction", TransactionController.delete);

router.get(
  "/transaction/cate",
  AsyncHandle(TransactionController.getTransactionByCategory)
);

router.get("/statistics", TransactionController.getStatistics);
router.get("/statistics/calendar", TransactionController.getStaticCalander);
router.delete("/DontClick", AsyncHandle(TransactionController.DontClick));

module.exports = router;
