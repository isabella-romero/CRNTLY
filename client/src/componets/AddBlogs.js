import { Box, Button, TextField, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/material"; // Corrected import
import axios from "axios";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// build a form to add a blog

const AddBlogs = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  });

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: localStorage.getItem("userId")
      });
      navigate("/blogs");
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZvcmVzdHxlbnwwfDB8MHx8fDA%3D)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '90%', md: '60%' },
          maxWidth: 800,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          p: 4,
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'text.primary',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Share Your CRNTLY
        </Typography>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          sx={{ mb: 3 }}
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }
          }}
          required
        />

        <TextareaAutosize
          minRows={8}
          name="description"
          value={inputs.description}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '16.5px 14px',
            fontSize: '1rem',
            fontFamily: 'inherit',
            borderRadius: '4px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '24px',
            resize: 'vertical'
          }}
          placeholder="Description"
          required
        />

        <TextField
          fullWidth
          label="Image URL (Optional)"
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
          sx={{ mb: 4 }}
          variant="outlined"
          InputProps={{
            sx: {
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Publish
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddBlogs;