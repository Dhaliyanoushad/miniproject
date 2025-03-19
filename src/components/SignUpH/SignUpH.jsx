import React, { useState } from "react";
import "./SignUpH.css";
import { useNavigate } from "react-router-dom";

const SignUpH = () => {
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
    <div className="sh-auth">
      {/* Left Side: Blurry Background */}
      <div className="sh-auth__left">
        {/* <p className="sh-auth__title">Sign Up as Guest</p>
        <p className="sh-auth__free">FOR FREE</p> */}
      </div>

      {/* Right Side: Sign Up Form */}
      <div className="sh-auth__right">
        <h2 className="sh-auth__heading">Create Host Account</h2>
        <form className="sh-auth__form">
          {/* Full Name */}
          <input
            className="sh-auth__input"
            type="text"
            placeholder="Full Name"
          />

          {/* Email */}
          <input
            className="sh-auth__input"
            type="email"
            placeholder="Enter your email"
          />

          {/* Password */}
          <input
            className="sh-auth__input"
            type="password"
            placeholder="Create password"
          />

          {/* College Name */}
          <input
            className="sh-auth__input"
            type="text"
            placeholder="Occupation"
          />

          {/* Phone Number */}
          <input
            className="sh-auth__input"
            type="text"
            placeholder="Phone Number"
          />

          {/* Upload Student ID Photo */}
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
          <button
            className="sh-auth__btn sh-auth__btn--primary"
            onClick={() => navigate("/hostdashboard")}
          >
            Create Account
          </button>

          {/* Login Option */}
          <p className="sh-auth__login-text">
            Already have an account?{" "}
            <a onClick={() => navigate("/loginguest")}>Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpH;
