import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import starIcon from "../../assets/StarIcon.svg";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "United States",
    agreedToTerms: false,
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
    console.log("Form submitted:", formData);
    // Add your authentication logic here
  };

  const redirectToSignIn = () => {
    navigate("/signin");
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
        <h1 className="welcome-text">Welcome to Nixon+!</h1>
        <p className="info-text">
          Credentials are only used to authenticate in ProfitHub. All saved data
          will be stored in your database.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="name-inputs">
            <input
              type="text"
              name="firstName"
              placeholder="Emily"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Johnson"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

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

          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="Other">Other</option>
          </select>

          <div className="terms-container">
            <input
              type="checkbox"
              name="agreedToTerms"
              id="terms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms of service</a> and{" "}
              <a href="#">Privacy policies</a> of ProfitHub Corporation
            </label>
          </div>

          <button type="submit" className="signup-button">
            SIGN UP
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

        {/* Redirect to Sign In */}
        <div className="redirect-container">
          <p>Already have an account?</p>
          <button className="redirect-button" onClick={redirectToSignIn}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
