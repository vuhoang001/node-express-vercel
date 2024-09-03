const express = require("express");
const route = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const ReportController = require("../controllers/reports.controller");
route.get("/", AsyncHandle(ReportController.test));

module.exports = route;
