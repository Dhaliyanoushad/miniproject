import React, { useState } from "react";
import "./LoginG.css";
import { useNavigate } from "react-router-dom";

const LoginG = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", studentId, password);
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
          {/* Student ID */}
          <input
            className="lg-auth__input"
            type="text"
            placeholder="Enter your Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
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

          {/* Login Button */}
          <button
            type="submit"
            className="lg-auth__btn lg-auth__btn--primary"
            onClick={() => navigate("/guestdashboard")}
          >
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
