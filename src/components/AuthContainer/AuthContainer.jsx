import React, { useState } from "react";
import LoginComponent from "./LoginComponent"; // Your existing sign-up component
import SignInComponent from "./SignInComponent"; // The new sign-in component
import "./AuthContainer.css";
import { BrowserRouter } from "react-router-dom";

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState("signup"); // Default to signup view

  const toggleAuthMode = (mode) => {
    setAuthMode(mode);
  };

  return (
    <BrowserRouter>
      <div className="auth-page">
        <div className="auth-toggle-buttons">
          <button
            className={`auth-toggle-btn ${
              authMode === "signup" ? "active" : ""
            }`}
            onClick={() => toggleAuthMode("signup")}
          >
            Sign Up
          </button>
          <button
            className={`auth-toggle-btn ${
              authMode === "signin" ? "active" : ""
            }`}
            onClick={() => toggleAuthMode("signin")}
          >
            Sign In
          </button>
        </div>

        {authMode === "signup" ? <LoginComponent /> : <SignInComponent />}
      </div>
    </BrowserRouter>
  );
};

export default AuthContainer;
