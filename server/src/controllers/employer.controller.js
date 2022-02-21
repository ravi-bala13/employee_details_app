const express = require("express");

const router = express.Router();
const Employer = require("../models/employer.model");

router.post("/", async (req, res) => {
  //   console.log("req.body:", req.body);
  try {
    const user = await Employer.create(req.body);

    return res.status(200).json(user);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

router.get("/", async (req, res) => {
  // console.log("req.body:", req.params.id);
  try {
    const user = await Employer.find().lean().exec();

    return res.status(200).json(user);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

router.get("/:id", async (req, res) => {
  console.log("req.body:", req.params.id);
  try {
    const user = await Employer.findById(req.params.id).lean().exec();

    return res.status(200).json(user);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "Failed", message: error });
  }
});

module.exports = router;
