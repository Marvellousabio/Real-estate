// routes/blogRoutes.js
import express from "express";
import Blog from "../model/blog.js";
import { upload } from "../config/storage.js";

const blogRouter = express.Router();

// Get all blogs
blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single blog by ID
blogRouter.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add new blog (Admin use)
blogRouter.post("/blogs", upload.single("image"), async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      image: req.file.path,  // Cloudinary gives URL in .path
      date: new Date(),
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog" });
  }
});

export default blogRouter;
