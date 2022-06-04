const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  empId: {
    type: Number,
    unique: true,
    required: true,
  },
  empName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  empEmail: {
    type: String,
    required: true,
    unique: true,
  },
  empSalary: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Emp", empSchema);
