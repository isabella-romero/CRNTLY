import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(null); // for error state

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Failed to load blogs. Please try again later.");
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <div>
      {blogs.map((blog, index) => (
        <Blog
          key={index}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user._id}
          title={blog.title}
          desc={blog.desc}
          img={blog.img}
          user={blog.user.name}
          date={new Date(blog.date).toLocaleDateString()}
        />
      ))}
    </div>
  );
};

export default Blogs;
