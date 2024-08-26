const express = require("express");
const router = express.Router();

const TransactionController = require("../controllers/transaction.controller");
const { checkUid } = require("../middlewares/checkUid.middlewares");

router.use(checkUid);
router.get("/transaction", TransactionController.getAll);
router.post("/transaction", TransactionController.create);
router.patch("/transaction", TransactionController.edit);
router.delete("/transaction", TransactionController.delete);

router.get("/statistics", TransactionController.getStatistics);
module.exports = router;
