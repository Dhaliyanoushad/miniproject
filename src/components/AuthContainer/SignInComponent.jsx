import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import starIcon from "../../assets/StarIcon.svg";

const SignInComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in form submitted:", formData);
    // Add your authentication logic here
  };

  const redirectToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      {/* Background stars and decorations */}
      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="cosmic-glow"></div>

      <div className="login-card">
        {/* Logo */}
        <div className="logo-container">
          <div className="logo">
            <img src={starIcon} alt="Nixon+ Logo" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="welcome-text">Welcome Back!</h1>
        <p className="info-text">
          Sign in to your Nixon+ account to access your personalized experience.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="emily@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-container">
            <input
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" className="toggle-password">
              <span className="eye-icon">👁️</span>
            </button>
          </div>

          <div className="remember-forgot-container">
            <div className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-button">
            SIGN IN
          </button>
        </form>

        {/* Social Login Options */}
        <div className="social-login">
          <button className="social-btn apple">
            <i className="fab fa-apple"></i>
          </button>
          <button className="social-btn google">
            <i className="fab fa-google"></i>
          </button>
          <button className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
          </button>
        </div>

        {/* Redirect to Sign Up */}
        <div className="redirect-container">
          <p>Don't have an account?</p>
          <button className="redirect-button" onClick={redirectToSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
