const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");

module.exports.register = async function (req, res) {
  try {
    let phone = req.body.phone;

    // checking both password in form to be same
    console.log("==============================================", req.body);

    if (req.body.password != req.body.confirm_password) {
      return response.status(403).json({
        success: false,
        message: "Password doesn't matched",
      });
    }
    // finding user if already exist
    let doctor = await Doctor.findOne({ phone: phone });
    if (!doctor) {
      let salt = 7;
      // encrypting password
      let passwordHash = await bcrypt.hash(req.body.password, salt);
      // creating user
      doctor = await Doctor.create({
        phone: req.body.phone,
        password: passwordHash,
        name: req.body.name,
      });

      return res.status(200).json({
        success: true,
        message: "Doctor Registered Successfully",
      });
    } else {
      return res.status(402).json({
        success: false,
        message: "Doctor exist with these mobile number",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    //   finding the user in db
    let doctor = await Doctor.findOne({ phone: req.body.phone });

    // checking if user exist or not
    if (!doctor) {
      return res.status(402).json({
        success: false,
        message: "Please Register! account not exist with these number",
      });
    }

    // comparing encrypted password with input password
    bcrypt.compare(req.body.password, doctor.password, function (err, result) {
      if (result != true) {
        return res.status(402).json({
          success: false,
          message: "Invalid Username or Password",
        });
      }

      //   if password matched return user and token
      return res.status(200).json({
        data: {
          user: doctor.toObject(),
          token: jwt.sign(doctor.toObject(), "hospital", {
            expiresIn: 100000,
          }),
        },
        message: "Sign in successfull here is your token, keep it safe",
        success: true,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
