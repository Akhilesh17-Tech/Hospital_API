const express = require("express");

const router = express.Router();
const reportController = require("../controllers/reports_controller");

router.get("/get_report/:report_code", reportController.getReportWithCode);

router.get("/:status", reportController.getReportWithStatus);

module.exports = router;
