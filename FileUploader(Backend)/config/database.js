const mongoose = require("mongoose");
require("dotenv").config();

const Dbconnect = () => {
  mongoose
    .connect(process.env.dbURL)
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch(e => {
      console.log("Error while connecting DB", e);
    });
};

module.exports = Dbconnect;
