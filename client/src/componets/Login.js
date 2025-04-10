import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)',
          p: 4,
          borderRadius: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>
        
        {isSignup && (
          <TextField
            fullWidth
            name="name"
            label="Name"
            onChange={handleChange}
            value={inputs.name}
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
        
        <TextField
          fullWidth
          name="email"
          label="Email"
          onChange={handleChange}
          value={inputs.email}
          type="email"
          margin="normal"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          name="password"
          label="Password"
          onChange={handleChange}
          value={inputs.password}
          type="password"
          margin="normal"
          variant="outlined"
          sx={{ mb: 3 }}
        />
        
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, 0.3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)'
            },
            transition: 'all 0.3s ease'
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>
        
        <Button
          onClick={() => setIsSignup(!isSignup)}
          sx={{
            mt: 2,
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'transparent'
            }
          }}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;