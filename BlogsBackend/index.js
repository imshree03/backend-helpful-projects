const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const blog = require("./routes/blog");

app.use(express.json());

app.use("/api/v1", blog);

const DB = require("./config/database");
DB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
