import React, { useState } from "react";
import "./LoginH.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginH = () => {
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
        "http://localhost:5000/hosts/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        navigate("/hostdashboard");
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
    <div className="lh-auth">
      {/* Left Side: Background Image */}
      <div className="lh-auth__left">
        {/* <p className="lh-auth__title">Welcome Back!</p>
        <p className="lh-auth__free">LOG IN AS HOST</p> */}
      </div>

      {/* Right Side: Login Form */}
      <div className="lh-auth__right">
        <h2 className="lh-auth__heading">Login as Host</h2>
        <form className="lh-auth__form" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            className="lh-auth__input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            className="lh-auth__input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember Me & Forgot Password */}
          <div className="lh-auth__form-group">
            <label className="lh-auth__checkbox">
              <input type="checkbox" className="lh-auth__checkbox-input" />
              Remember me
            </label>
            <a href="#" className="lh-auth__forgot-password">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="lh-auth__btn lh-auth__btn--primary">
            Log In
          </button>
          {error && <div className="lg-auth__error">{error}</div>}

          {/* Sign Up Option */}
          <p className="lh-auth__signup-text">
            Don't have an account?{" "}
            <a onClick={() => navigate("/signuphost")}>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginH;
