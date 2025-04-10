import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { Box } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Background image style
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D')",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "40px 20px"
  };

  // Content style with dark overlay for better text readability
  const contentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    color: "#fff", // White text for better contrast
    textShadow: "1px 1px 3px rgba(0,0,0,0.8)" // Text shadow for readability
  };

  if (loading) return (
    <Box style={backgroundStyle}>
      <Box style={contentStyle}>
        <p>Loading posts...</p>
      </Box>
    </Box>
  );
  
  if (error) return (
    <Box style={backgroundStyle}>
      <Box style={contentStyle}>
        <p>{error}</p>
      </Box>
    </Box>
  );
  
  if (blogs.length === 0) return (
    <Box style={backgroundStyle}>
      <Box style={contentStyle}>
        <p>No posts found.</p>
      </Box>
    </Box>
  );

  return (
    <Box style={backgroundStyle}>
      <Box style={contentStyle}>
        {blogs.map((blog, index) => (
          <Box key={index} sx={{ 
            mb: 4,
            p: 3,
            backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay for each blog post
            borderRadius: "8px",
            backdropFilter: "blur(2px)"
          }}>
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              desc={blog.desc}
              img={blog.img} // Make sure this is passed to your Blog component
              user={blog.user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Blogs;