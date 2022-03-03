const express = require("express");

const router = express.Router();

const passport = require("passport");

// accessing home controller
const patientController = require("../controllers/patients_controller");

// router for patient registration
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientController.register
);

// router for creating report and getting report

router.post(
  "/:id/create_report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);

router.get("/:id/all_reports", patientController.allReports);

module.exports = router;
