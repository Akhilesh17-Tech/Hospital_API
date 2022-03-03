const express = require("express");

const router = express.Router();
const doctorsController = require("../controllers/doctors_controller");

router.post("/register", doctorsController.register);
router.post("/login", doctorsController.createSession);

module.exports = router;
