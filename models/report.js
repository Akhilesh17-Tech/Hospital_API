const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    created_by_doctor: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    referred_by: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "negative",
        "travelled-quarantine",
        "symptoms-quarantine",
        "positive-admit",
      ],
    },
  },
  {
    timestamps: true,
  }
);
if (!reportSchema.options.toObject) reportSchema.options.toObject = {};

//customizing report object
reportSchema.options.toObject.transform = function (doc, report, options) {
  delete report._id;
  delete report.updatedAt;
  delete report.createdAt;
  delete report.__v;
  return report;
};

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
