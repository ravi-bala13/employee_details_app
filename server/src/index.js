const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
const { register, login } = require("./controllers/auth.controller");
// const EmployerController = require("./controllers/employer.controller");
const EmployeeController = require("./controllers/employee.controller");

app.post("/register", register);
app.post("/login", login);

// app.use("/employer", EmployerController);
app.use("/employee", EmployeeController);

module.exports = app;
