const Blog = require("../models/Blog");
const slugify = require("slugify");

// ==========================
// Create Blog
// ==========================
exports.createBlog = async (req, res) => {
  try {

    const data = {
      ...req.body,
      image: req.file ? req.file.filename : "",
    };

    // Generate SEO Slug
    data.slug = slugify(data.title, {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create(data);

    res.status(201).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Get All Blogs
// ==========================
exports.getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    res.json({
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      blogs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Single Blog
// ==========================
exports.getBlog = async (req, res) => {
  try {
    const param = req.params.id;

    console.log("Received Param:", param);

    let blog = null;

    if (/^[0-9a-fA-F]{24}$/.test(param)) {
      console.log("Searching by ID...");
      blog = await Blog.findById(param);
    } else {
      console.log("Searching by Slug...");
      blog = await Blog.findOne({ slug: param });
    }

    console.log("Blog Found:", blog);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Blog
// ==========================
exports.updateBlog = async (req, res) => {
  try {

    const data = {
      ...req.body,
    };

    // Update image only if a new one is uploaded
    if (req.file) {
      data.image = req.file.filename;
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Blog
// ==========================
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      message: "Blog Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Search Blogs
// ==========================
exports.searchBlogs = async (req, res) => {
  try {
    const title = req.query.title || "";
    const category = req.query.category || "";
    const tags = req.query.tags || "";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    let filter = {};

    if (title) {
      filter.title = {
        $regex: title,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    if (tags) {
      filter.tags = tags;
    }

    const totalBlogs = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      blogs,
      page,
      limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Dashboard
// ==========================
exports.dashboard = async (req, res) => {
  try {
    const User = require("../models/User");
    const Comment = require("../models/Comment");

    const totalBlogs = await Blog.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalComments = await Comment.countDocuments();

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalBlogs,
      totalUsers,
      totalComments,
      recentBlogs,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get Blogs by Category
exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.json(blogs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};