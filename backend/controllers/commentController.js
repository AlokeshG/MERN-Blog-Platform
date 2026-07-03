const Comment = require("../models/Comment");

// Add Comment
// Add Comment
exports.addComment = async (req, res) => {
  try {
    const { blog, name, comment } = req.body;

    if (!blog || !name || !comment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newComment = await Comment.create({
      blog,
      name,
      comment,
    });

    res.status(201).json(newComment);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Comments of a Blog
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Comment Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};