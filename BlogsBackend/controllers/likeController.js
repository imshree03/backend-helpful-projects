const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = new Like({ post, user });
    const savedLike = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $push: {
          likes: savedLike._id,
        },
      },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.json(updatedPost);
  } catch (e) {
    console.log(e);
  }
};

exports.unlikePost = async (req, res) => {
  const { post, like } = req.body;
  try {
    const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: deletedLike._id },
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
