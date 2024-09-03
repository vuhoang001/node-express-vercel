const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transaction.controller");
const { checkUid } = require("../middlewares/checkUid.middlewares");
const AsyncHandle = require("../helpers/AsyncHandle");

router.use(checkUid);
router.get("/transaction", TransactionController.getAll);
router.get(
  "/transaction/cate",
  AsyncHandle(TransactionController.getTransactionByCategory)
);
router.post("/transaction", TransactionController.create);
router.patch("/transaction", TransactionController.edit);
router.delete("/transaction", TransactionController.delete);

router.get("/statistics", TransactionController.getStatistics);
router.get("/statistics/calendar", TransactionController.getStaticCalander);
module.exports = router;
