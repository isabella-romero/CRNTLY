import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div>
          <h1>Welcome to CRNTLY</h1>
          <p>'Short Bio on how our app works'</p>
          <div>
            <button onClick={handleLoginClick}>
              Login
            </button>
            <button onClick={handleRegisterClick}>
              Create your Account
            </button>
          </div>
        </div>
      );
};

export default LandingPage;
    
