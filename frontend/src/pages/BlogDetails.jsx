import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <img src={post.image} alt={post.title} className="w-full h-80 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-[var(--primary)] mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{new Date(post.date).toDateString()}</p>
      <div className="text-lg text-[var(--text-dark)] leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </div>
  );
};

export default BlogDetails;
