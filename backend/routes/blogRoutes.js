const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  dashboard,
  getBlogsByCategory,
} = require("../controllers/blogController");

// Create Blog
router.post("/", upload.single("image"), createBlog);

// Get All Blogs
router.get("/", getBlogs);

// Search Blogs
router.get("/search", searchBlogs);

// Dashboard
router.get("/dashboard", dashboard);

// Category
router.get("/category/:category", getBlogsByCategory);

// Get Single Blog (ID or Slug)
router.get("/:id", getBlog);

// Update Blog
router.put("/:id", upload.single("image"), updateBlog);

// Delete Blog
router.delete("/:id", deleteBlog);

module.exports = router;