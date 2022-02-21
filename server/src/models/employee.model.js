const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // last_name: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true, default: "Male" },
    salary: { type: Number, required: true },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Employee = mongoose.model("employee", employeeSchema);

module.exports = Employee;
