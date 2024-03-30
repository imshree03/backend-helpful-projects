const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new Post({
      title,
      body,
    });
    const savedPost = await post.save();

    res.json({
      savedPost,
    });
  } catch (error) {
    console.log("Error while creating post");
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("comments").exec();

    res.json({
      allPosts,
    });
  } catch (error) {
    console.log(error);
  }
};
