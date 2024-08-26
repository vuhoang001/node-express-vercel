const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories.controller");

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.patch("/", categoryController.edit);
router.delete("/", categoryController.delete);
module.exports = router;
