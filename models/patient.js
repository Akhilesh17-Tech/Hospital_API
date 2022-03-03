const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);
if (!patientSchema.options.toObject) patientSchema.options.toObject = {};

//customizing user's object
patientSchema.options.toObject.transform = function (doc, user, options) {
  delete user.createdAt;
  delete user.reports;
  delete user.updatedAt;
  delete user.__v;
  return user;
};



const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
