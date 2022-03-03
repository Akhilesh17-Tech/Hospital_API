const express = require("express");

const router = express.Router();

//routes

//using doctors routes
router.use("/doctor", require("./doctor"));
// using patients routes
router.use("/patient", require("./patient"));
//using reports routes
router.use("/report", require("./report"));

module.exports = router;
