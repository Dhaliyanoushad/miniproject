import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./LoginH.css"; // Importing the styles

const LoginH = () => {
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
        `${import.meta.env.VITE_BASE_URL}/auth/loginhost`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("host", JSON.stringify(response.data.host));
        navigate("/hostdashboard");
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
    <div className="lh-auth">
      {/* Left Side: Background */}
      <div className="lh-auth__left"></div>

      {/* Right Side: Login Form */}
      <div className="lh-auth__right">
        <h2 className="lh-auth__heading">Login Host</h2>
        <form className="lh-auth__form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <input
            className="lh-auth__input"
            type="email"
            placeholder="Enter your email"
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
          <div className="lh-auth__form-group">
            <label className="lh-auth__checkbox">
              <input type="checkbox" className="lh-auth__checkbox-input" />
              Remember me
            </label>
            {/* <a href="#" className="lh-auth__forgot-password">
              Forgot password?
            </a> */}
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
