import React, { useState } from "react";
import "./SignUpH.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpH = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    phoneNumber: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the input
    setFormData({ ...formData, [name]: value }); // Update formData dynamically
  };

  // Handle file selection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        "http://localhost:5000/hosts/signup",
        formData
      );
      alert(response.data.msg);
      navigate("/loginhost");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="sh-auth">
      {/* Left Side: Blurry Background */}
      <div className="sh-auth__left"></div>

      {/* Right Side: Sign Up Form */}
      <div className="sh-auth__right">
        <h2 className="sh-auth__heading">Create Host Account</h2>
        <form className="sh-auth__form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <input
            className="sh-auth__input"
            type="text"
            name="fullName" // Added name attribute
            placeholder="Full Name"
            value={formData.fullName} // Added value attribute
            onChange={handleInputChange} // Added onChange handler
          />

          {/* Email */}
          <input
            className="sh-auth__input"
            type="email"
            name="email" // Added name attribute
            placeholder="Enter your email"
            value={formData.email} // Added value attribute
            onChange={handleInputChange} // Added onChange handler
          />

          {/* Password */}
          <input
            className="sh-auth__input"
            type="password"
            name="password" // Added name attribute
            placeholder="Create password"
            value={formData.password} // Added value attribute
            onChange={handleInputChange} // Added onChange handler
          />

          {/* Department */}
          <input
            className="sh-auth__input"
            type="text"
            name="department" // Added name attribute
            placeholder="department"
            value={formData.department} // Added value attribute
            onChange={handleInputChange} // Added onChange handler
          />

          {/* Phone Number */}
          <input
            className="sh-auth__input"
            type="text"
            name="phoneNumber" // Added name attribute
            placeholder="Phone Number"
            value={formData.phoneNumber} // Added value attribute
            onChange={handleInputChange} // Added onChange handler
          />

          {/* Terms and Conditions */}
          <div className="sh-auth__checkbox">
            <input
              type="checkbox"
              id="terms"
              className="sh-auth__checkbox-input"
            />
            <label className="sh-auth__checkbox-label" htmlFor="terms">
              I agree with <a href="#">Terms</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button className="sh-auth__btn sh-auth__btn--primary" type="submit">
            Create Account
          </button>

          {/* Login Option */}
          <p className="sh-auth__login-text">
            Already have an account?{" "}
            <a onClick={() => navigate("/loginhost")}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpH;
