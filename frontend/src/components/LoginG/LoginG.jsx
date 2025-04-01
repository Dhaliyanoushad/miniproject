import React, { useState } from "react";
import "./LoginG.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginG = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both Email and Password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/guestdashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.msg ||
          "Login failed. Please check your credentials and try again."
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="lg-auth">
      {/* Left Side: Background Image */}
      <div className="lg-auth__left"></div>

      {/* Right Side: Login Form */}
      <div className="lg-auth__right">
        <p className="lg-auth__title">Welcome Back!</p>
        <p className="lg-auth__free">LOG IN TO CONTINUE</p>
        {/* <h2 className="lg-auth__heading">Login as Guest</h2> */}
        <form className="lg-auth__form" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            className="lg-auth__input"
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            className="lg-auth__input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me & Forgot Password */}
          <div className="lg-auth__form-group">
            <label className="lg-auth__checkbox">
              <input type="checkbox" className="lg-auth__checkbox-input" />
              Remember me
            </label>
            <a href="#" className="lg-auth__forgot-password">
              Forgot password?
            </a>
          </div>

          {error && <div className="lg-auth__error">{error}</div>}

          {/* Login Button */}
          <button type="submit" className="lg-auth__btn lg-auth__btn--primary">
            Log In
          </button>

          {/* Sign Up Option */}
          <p className="lg-auth__signup-text">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signupguest")}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginG;
