const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = (req, res) => {
  try {
    const file = req.files.file;
    console.log("File-->", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log(path);

    file.mv(path, err => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "Local File uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;
    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedType = ["jpg", "jpeg", "png"];
    const ans = supportedType.includes(fileType);
    if (!ans) {
      return res.status(400).json({
        success: true,
        message: "File formate not supported",
      });
    }

    const response = await uploadTocloudinary(file, "FileUploaderProject");
    console.log(response);

    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "image successfully uploaded",
      image: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong in image upload",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedType = ["mp4", "mov"];
    const ans = supportedType.includes(fileType);

    if (!ans) {
      return res.status(400).json({
        success: true,
        message: "File formate not supported",
      });
    }

    const response = await uploadTocloudinary(file, "FileUploaderProject");
    console.log(response);

    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      videoUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "video successfully uploaded",
      video: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    // console.log(req);
    res.status(400).json({
      success: false,
      message: "Something went wrong in video upload",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedType = ["jpg", "jpeg", "png"];
    const ans = supportedType.includes(fileType);

    if (!ans) {
      return res.status(400).json({
        success: true,
        message: "File formate not supported",
      });
    }

    const response = await uploadTocloudinary(file, "FileUploaderProject", 40);
    console.log(response);

    const fileData = await File.create({
      name: name,
      tags: tags,
      email: email,
      imageUrl: response.secure_url,
    });

    res.status(200).json({
      success: true,
      message: "image successfully uploaded",
      image: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    // console.log(req);
    res.status(400).json({
      success: false,
      message: "Something went wrong in image upload",
    });
  }
};

async function uploadTocloudinary(file, folder, quality) {
  const options = {
    folder,
  };

  if (options) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  console.log(file.tempFilePath);
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
