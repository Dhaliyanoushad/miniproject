import React, { useState } from "react";
import "./SignUpH.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpH = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    Department: "",
    phoneNumber: "",
    profilePicture: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the input
    setFormData({ ...formData, [name]: value }); // Update formData dynamically
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Store actual image data
        setFileName(file.name);
        setFormData({ ...formData, profilePicture: reader.result }); // Update profilePicture in formData
      };
      reader.readAsDataURL(file); // Convert file to Data URL
    } else {
      setSelectedFile(null);
      setFileName("No file chosen");
      setFormData({ ...formData, profilePicture: "" }); // Clear profilePicture in formData
    }
  };

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
            name="Department" // Added name attribute
            placeholder="Department"
            value={formData.Department} // Added value attribute
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

          {/* Upload Photo */}
          <div className="sh-auth__form-group">
            <label className="sh-auth__label">Upload Photo</label>
            <div className="sh-auth__file-upload">
              <input
                type="file"
                accept="image/*"
                className="sh-auth__file-input"
                id="fileInput"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className="sh-auth__file-label">
                Choose File
              </label>
              <span className="sh-auth__file-name">{fileName}</span>
            </div>
            {selectedFile && (
              <img
                src={selectedFile}
                alt="Preview"
                className="sh-auth__image-preview"
              />
            )}
          </div>

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
