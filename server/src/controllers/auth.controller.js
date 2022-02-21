require("dotenv").config();
const jwt = require("jsonwebtoken");

const Employer = require("../models/employer.model");

// console.log("JWT_ACCESS_KEY:", process.env.JWT_ACCESS_KEY);
const newToken = (employer) => {
  return jwt.sign({ employer: employer }, process.env.JWT_ACCESS_KEY);
  // return jwt.sign({ employer: employer }, "bala");
};

const register = async (req, res) => {
  try {
    // check if the email address provided already exist
    let employer = await Employer.findOne({ email: req.body.email })
      .lean()
      .exec();

    // if it already exists then throw an error
    if (employer)
      return res.status(400).json({
        status: "failed",
        message: " There is already account in this email address",
      });

    // else we will create the employer we will hash the password as plain text password is harmful
    employer = await Employer.create(req.body);

    // we will create the token
    const token = newToken(employer);

    // return the employer and the token
    res.status(201).json({ employer, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

const login = async (req, res) => {
  try {
    // check if the email address provided already exist
    let employer = await Employer.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!employer)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // else we match the password
    const match = await employer.checkPassword(req.body.password);
    // const match = true;

    // if not match then throw an error
    if (!match)
      return res.status(400).json({
        status: "failed",
        message: " Please provide correct email address and password",
      });

    // if it matches then create the token
    const token = newToken(employer);

    // return the employer and the token
    res.status(201).json({ employer, token });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
};

module.exports = { register, login };
