const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async function (req, res) {
  try {
    //   find the user
    let patient = await Patient.findOne({ phone: req.body.phone });

    // if patient is not registered creating a patient
    if (!patient) {
      patient = await Patient.create({
        phone: req.body.phone,
        name: req.body.name,
      });
      return res.status(200).json({
        data: {
          patient: patient.toObject(),
        },
        success: true,
        message: "Patient registered successfully",
      });
    } else {
      return res.status(200).json({
        data: {
          patient: patient.toObject(),
        },
        success: true,
        message: "Patient already exist with this mobile number",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async function (req, res) {
  try {
    let patient = await Patient.findById({ _id: req.params.id });

    // if patient does not exist
    if (!patient) {
      return res.status(402).json({
        success: false,
        message: "Patient not registered or patient id is incorrect",
      });
    }

    // for matching input status with these status
    let statusValues = [
      "negative",
      "travelled-quarantine",
      "symptoms-quarantine",
      "positive-admit",
    ];
    let date = req.body.date;
    // getting report status

    let status = req.body.status.toLowerCase();

    // checking if status is of these values or not
    if (!statusValues.includes(status)) {
      return res.status(402).json({
        success: false,
        message:
          "Status value is incorrect...values can be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit",
      });
    }
    let doctor_name = req.body.doctor_name;
    //setting the current date if date is not given by doctor for report creation

    if (date == undefined) {
      let currentDate = new Date();
      date =
        currentDate.getDate() +
        "-" +
        currentDate.getMonth() +
        "-" +
        currentDate.getFullYear();
    }
    // setting doctor name to default logged in doctor if doctor name is not given
    if (doctor_name == undefined) {
      doctor_name = req.user.name;
    }

    console.log(
      "===============------------------------------------=",
      req.body
    );
    console.log(
      "===============------------------------------------=",
      req.user.name,
      doctor_name
    );
    // creating report
    let report = await Report.create({
      patient: req.params.id,
      created_by_doctor: req.user.name,
      referred_by: doctor_name,
      date: date,
      code: Date.now(),
      status: status.toLowerCase(),
    });

    //pushing report to user objects reports array
    patient.reports.push(report.id);
    patient.save();

    // sending report code
    return res.status(200).json({
      data: {
        report_code: report.code,
      },
      success: true,
      message: "Report created successfully",
    });
  } catch (err) {
    console.log("+++++++++++++++++++++++++++++++", err);
    if (err.name === "CastError") {
      return response.status(402).json({
        success: false,
        message: "Invalid Patient ID",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.allReports = async function (req, res) {
  try {
    //   finding all reports of all user
    let patient = await Patient.findById(req.params.id).populate("reports");
    let finalReports = [];
    for (report of patient.reports) {
      finalReports.push(report);
    }

    return res.status(200).json({
      data: {
        patient: patient.toObject(),
        reports: finalReports,
      },
      success: true,
      message: "All report Received",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
