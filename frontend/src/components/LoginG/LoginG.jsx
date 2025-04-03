import React, { useState } from "react";
import "./LoginG.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const LoginG = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both Email and Password.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/loginguest`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("guest", JSON.stringify(response.data.guest));
        navigate("/guestdashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.msg ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="lg-auth">
      {/* Left Side: Background Image */}
      <div className="lg-auth__left"></div>

      {/* Right Side: Login Form */}
      <div className="lg-auth__right">
        <p className="lg-auth__title">Guest Login</p>
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

          {/* Password Input with Eye Icon */}
          <div className="relative w-full">
            <input
              className="lh-auth__input pr-10" // Added padding for icon spacing
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="lg-auth__form-group">
            <label className="lg-auth__checkbox">
              <input type="checkbox" className="lg-auth__checkbox-input" />
              Remember me
            </label>
            {/* <a href="#" className="lg-auth__forgot-password">
              Forgot password?
            </a> */}
          </div>

          {/* Login Button */}
          <button type="submit" className="lg-auth__btn lg-auth__btn--primary">
            Log In
          </button>

          {error && <div className="lg-auth__error">{error}</div>}

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
