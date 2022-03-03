const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
if (!doctorSchema.options.toObject) doctorSchema.options.toObject = {};

//customizing user's object
doctorSchema.options.toObject.transform = function (doc, user, options) {
  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  return user;
};

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
