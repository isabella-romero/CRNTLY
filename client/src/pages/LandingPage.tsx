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
        <div>
          <img
            src="/path/to/your/image.jpg" // Replace with the actual path to your image
            alt="App Logo"
            />
          <h1>Welcome to CRNTLY</h1>
        </div>
        <p>'Short Bio on how our app works'</p>
        <div>
          <button onClick={handleLoginClick} style={{ margin: "10px", padding: "10px 20px" }}>
            Login
          </button>
          <button onClick={handleRegisterClick} style={{ margin: "10px", padding: "10px 20px" }}>
            Create your Account
          </button>
        </div>
      </div>
    );
  };
  
export default LandingPage;
    
