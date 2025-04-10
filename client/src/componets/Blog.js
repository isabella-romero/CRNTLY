import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
    Tooltip,
  } from "@mui/material";
  import React from "react";
  import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
  import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { useStyles } from "./utils";
  import config from "../config";
  
  //displays the blogs and lets the user edit and delete the blogs
  
  const Blogs = ({ title, desc, img, user, isUser, id }) => {
    const classes = useStyles();
    const navigate = useNavigate();
  
    const handleEdit = () => {
      navigate(`/myBlogs/${id}`);
    };
  
    const deleteRequest = async () => {
      const res = await axios
        .delete(`${config.BASE_URL}/api/blogs/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };
  
    const handleDelete = () => {
      deleteRequest()
        .then(() => navigate("/"))
        .then(() => navigate("/blogs"));
    };
  
    return (
      <div>
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            margin: "auto",
            mt: 2,
            borderRadius: 2,
            boxShadow: 3,
            ":hover": {
              boxShadow: 8,
              transform: "translateY(-5px)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            },
          }}
        >
          {isUser && (
            <Box display="flex" justifyContent="flex-end" p={1}>
              <Tooltip title="Edit">
                <IconButton onClick={handleEdit} sx={{ marginRight: 1 }}>
                  <ModeEditOutlineIcon color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleDelete}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
  
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  width: 45,
                  height: 45,
                  border: "2px solid #fff",
                }}
              >
                {user ? user.charAt(0) : ""}
              </Avatar>
            }
            title={<Typography variant="h6">{title}</Typography>}
            subheader={<Typography variant="body2" color="text.secondary">{user}</Typography>}
          />
  
          <CardMedia component="img" height="250" image={img} alt="Blog image" />
  
          <CardContent>
            <Typography variant="body1" color="text.primary" paragraph>
              {/* Render the description, emojis will be automatically displayed here */}
              {desc}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Blogs;
  
  