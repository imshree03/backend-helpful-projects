const express = require("express");
const app = express();
require("dotenv").config();
const fileupload = require("express-fileupload");
const db = require("./config/database");
const cloud = require("./config/cloudinary");
const uploadRoutes = require("./routes/FileUpload");

db();
cloud.cloudinaryConnect();

app.use(fileupload({ useTempFiles: true }));
app.use("/api/v1/upload", uploadRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
