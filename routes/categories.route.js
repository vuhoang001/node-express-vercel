const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.controller");
const { checkUid } = require("../middlewares/checkUid.middlewares");
const AsyncHandle = require("../helpers/AsyncHandle");

router.use(checkUid);
router.get("/", AsyncHandle(categoryController.getAll));
router.post("/", AsyncHandle(categoryController.create));
router.patch("/", AsyncHandle(categoryController.edit));
router.delete("/", AsyncHandle(categoryController.delete));
module.exports = router;
