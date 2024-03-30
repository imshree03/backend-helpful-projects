const mongoose = require("mongoose");

require("dotenv").config();

const DB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Db connected successfully"))
    .catch(e => console.log("Error while db connection", e));
};

module.exports = DB;
