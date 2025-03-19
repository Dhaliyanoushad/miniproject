import React, { useState } from "react";
import "./SignUpG.css";
import { useNavigate } from "react-router-dom";

const SignUpG = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result); // Store actual image data
        setFileName(file.name);
      };
      reader.readAsDataURL(file); // Convert file to Data URL
    } else {
      setSelectedFile(null);
      setFileName("No file chosen");
    }
  };
  return (
    <div className="sg-auth">
      {/* Left Side: Blurry Background */}
      <div className="sg-auth__left">
        {/* <p className="sg-auth__title">Sign Up as Guest</p>
        <p className="sg-auth__free">FOR FREE</p> */}
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="sg-auth__right">
        <h2 className="sg-auth__heading">Create Guest Account</h2>
        <form className="sg-auth__form">
          {/* Full Name */}
          <input
            className="sg-auth__input"
            type="text"
            placeholder="Full Name"
          />

          {/* Email */}
          <input
            className="sg-auth__input"
            type="email"
            placeholder="Enter your email"
          />

          {/* Password */}
          <input
            className="sg-auth__input"
            type="password"
            placeholder="Create password"
          />

          {/* College Name */}
          <input
            className="sg-auth__input"
            type="text"
            placeholder="College Name"
          />

          {/* Student ID Number */}
          <input
            className="sg-auth__input"
            type="text"
            placeholder="Student ID Number"
          />

          {/* Upload Student ID Photo */}
          <div className="sg-auth__form-group">
            <label className="sg-auth__label">Upload Student ID</label>
            <div className="sg-auth__file-upload">
              <input
                type="file"
                accept="image/*"
                className="sg-auth__file-input"
                id="fileInput"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className="sg-auth__file-label">
                Choose File
              </label>
              <span className="sg-auth__file-name">{fileName}</span>
            </div>
            {selectedFile && (
              <img
                src={selectedFile}
                alt="Preview"
                className="sg-auth__image-preview"
              />
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="sg-auth__checkbox">
            <input
              type="checkbox"
              id="terms"
              className="sg-auth__checkbox-input"
            />
            <label className="sg-auth__checkbox-label" htmlFor="terms">
              I agree with <a href="#">Terms</a> and{" "}
              <a href="#">Privacy Policy</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            className="sg-auth__btn sg-auth__btn--primary"
            onClick={() => navigate("/guestdashboard")}
          >
            Create Account
          </button>

          {/* Login Option */}
          <p className="sg-auth__login-text">
            Already have an account?{" "}
            <a onClick={() => navigate("/loginguest")}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpG;
