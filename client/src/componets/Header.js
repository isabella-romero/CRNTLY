import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  return (
    <AppBar position="sticky" sx={{ background: `${theme.bg}`, boxShadow: 3 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: "bold", letterSpacing: 1, color: theme.primary }}>
          CRNTLY
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              indicatorColor="secondary"
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
                sx={{ "&:hover": { color: theme.primary } }}
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
                sx={{ "&:hover": { color: theme.primary } }}
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
                sx={{ "&:hover": { color: theme.primary } }}
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.primary,
                    transform: "scale(1.05)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.primary,
                    transform: "scale(1.05)",
                  },
                }}
              >
                SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                backgroundColor: theme.button,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.primary,
                  transform: "scale(1.05)",
                },
              }}
              color="warning"
            >
              Logout
            </Button>
          )}
          <div
            onClick={(e) => {
              e.preventDefault();
              dispatch(setDarkmode(!isDark));
            }}
            style={{
              alignContent: "center",
              padding: "10px 0",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            {isDark ? (
              <LightModeIcon sx={{ color: theme.primary }} />
            ) : (
              <DarkModeIcon sx={{ color: theme.primary }} />
            )}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
