const express = require("express");

const router = express.Router();
// const Employee = require("../models/employee.model");
const Employee = require("../models/employee.model");

router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);

    return res.status(200).json(employee);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;

    const skip = (page - 1) * size;

    const employee = await Employee.find().skip(skip).limit(size).lean().exec();
    const totalPages = Math.ceil(
      (await Employee.find().countDocuments()) / size
    );

    return res.status(200).json({ employee, totalPages });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).lean().exec();

    return res.status(200).json(employee);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

module.exports = router;
