import React, { useState } from "react";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("image", image);

    try {
      const res = await axios.post("/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Blog created:", res.data);
      // Reset after submit
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ✍️ Create a New Blog
        </h2>

        {/* Blog Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Blog Excerpt */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Short Excerpt
          </label>
          <input
            type="text"
            placeholder="A short summary for your blog"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Blog Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Content
          </label>
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 h-48 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Blog Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
            className="w-full text-gray-600"
            required
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
