import { Box, Button, InputLabel, TextField, Typography, IconButton } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import EmojiPicker from "emoji-picker-react"; // You will need to install this package

const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    emoji: "", // For storing selected emoji
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle for showing emoji picker

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmojiClick = (emoji: any) => {
    setInputs((prevState) => ({
      ...prevState,
      emoji: emoji.emoji, // Set the emoji as the selected emoji
    }));
    setShowEmojiPicker(false); // Hide emoji picker after selection
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        emoji: inputs.emoji, // Send emoji as part of the blog post
        user: localStorage.getItem("userId"),
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        borderRadius={3}
        boxShadow="0px 4px 15px rgba(0, 0, 0, 0.1)"
        padding={3}
        margin="auto"
        marginTop={5}
        display="flex"
        flexDirection="column"
        width="70%"
        sx={{ backgroundColor: "#fff", overflow: "hidden" }}
      >
        <Typography
          className={classes.font}
          variant="h3"
          color="primary"
          textAlign="center"
          paddingBottom={3}
        >
          Post Your Blog
        </Typography>

        <InputLabel className={classes.font} sx={labelStyles}>
          Title
        </InputLabel>
        <TextField
          className={classes.font}
          name="title"
          onChange={handleChange}
          value={inputs.title}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />

        <InputLabel className={classes.font} sx={labelStyles}>
          Description
        </InputLabel>
        <TextareaAutosize
          className={classes.font}
          name="description"
          onChange={handleChange}
          minRows={6}
          value={inputs.description}
          sx={{ marginBottom: 2, padding: 1, fontSize: "16px", borderRadius: 1 }}
        />

        <InputLabel className={classes.font} sx={labelStyles}>
          Select an Emoji
        </InputLabel>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TextField
            className={classes.font}
            name="emoji"
            value={inputs.emoji}
            variant="outlined"
            sx={{ marginBottom: 2, width: "80%" }}
            readOnly
          />
          <IconButton
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            sx={{ marginLeft: 1 }}
          >
            😀
          </IconButton>
        </Box>

        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiClick} /> // Show emoji picker when toggled
        )}

        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 2,
            borderRadius: 4,
            backgroundColor: "#1976d2",
            '&:hover': { backgroundColor: "#1565c0" },
          }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AddBlogs;
