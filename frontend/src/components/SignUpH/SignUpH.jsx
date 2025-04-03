import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUpH.css"; // Importing the styles

const SignUpH = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, department, phoneNumber } = formData;
    if (!fullName || !email || !password || !department || !phoneNumber) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signuphost`,
        formData
      );
      alert(response.data.msg);
      navigate("/hostdashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side: Background */}
      <div className="signup-background"></div>

      {/* Right Side: Sign Up Form */}
      <div className="signup-form-container">
        <div className="signup-form-box">
          <h2 className="signup-heading">Create Host Account</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              className="form-input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Password Field with Eye Icon */}
            <div className="password-container">
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              className="form-input"
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
            />

            <input
              className="form-input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <div className="terms-container">
              <input type="checkbox" id="terms" className="terms-checkbox" />
              <label htmlFor="terms" className="terms-label">
                I agree with{" "}
                <a href="#" className="terms-link">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button className="submit-button" type="submit">
              Create Account
            </button>

            <p className="login-text">
              Already have an account?{" "}
              <span
                className="login-link"
                onClick={() => navigate("/loginhost")}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpH;
