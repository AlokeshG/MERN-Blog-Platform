const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Add Comment
router.post("/", addComment);

// Get Comments of a Blog
router.get("/:blogId", getComments);

// Delete Comment
router.delete("/:id", deleteComment);

module.exports = router;