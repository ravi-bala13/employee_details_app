const mongoose = require("mongoose");

const connect = () =>
  mongoose.connect(
    "mongodb+srv://ravibala-13:bals1999@cluster0.hfo0i.mongodb.net/employee_records"
  );

module.exports = connect;
