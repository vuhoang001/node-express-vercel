const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.controller");
const { checkUid } = require("../middlewares/checkUid.middlewares");

router.use(checkUid);
router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.patch("/", categoryController.edit);
router.delete("/", categoryController.delete);
module.exports = router;
