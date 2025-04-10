import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { 
  mb: 1, 
  mt: 2, 
  fontSize: "18px", 
  fontWeight: "500", 
  color: "#e0e0e0" 
};

//shows details of the blog
const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  // Your original functions (unchanged)
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              border: "2px solid transparent",
              borderRadius: 4,
              padding: 4,
              margin: "auto",
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              width: { xs: "90%", md: "60%" },
              background: "rgba(30, 30, 40, 0.7)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              borderImage: "linear-gradient(45deg, #ff6b6b, #4ecdc4) 1",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                padding: 2,
                color: "#ffffff",
                variant: "h3",
                textAlign: "center",
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Post Your Mood
            </Typography>

            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin="normal"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#f0f0f0",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff6b6b",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4ecdc4",
                  },
                },
              }}
            />

            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#f0f0f0",
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff6b6b",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4ecdc4",
                  },
                },
              }}
            />

            <Button
              sx={{
                mt: 3,
                borderRadius: 2,
                padding: "12px 24px",
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
                color: "#fff",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
              type="submit"
            >
              Update Post
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;