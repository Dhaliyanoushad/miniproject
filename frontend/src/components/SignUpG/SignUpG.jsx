import React, { useState } from "react";
import "./SignUpG.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpG = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    collageName: "",
    studentIdNumber: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        formData
      );
      alert(response.data.msg);
      navigate("/loginguest");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="sg-auth">
      <div className="sg-auth__left"></div>
      <div className="sg-auth__right">
        <h2 className="sg-auth__heading">Create Guest Account</h2>
        <form className="sg-auth__form" onSubmit={handleSubmit}>
          <input
            className="sg-auth__input"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            className="sg-auth__input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="sg-auth__input"
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="sg-auth__input"
            type="text"
            name="collageName"
            placeholder="College Name"
            value={formData.collageName}
            onChange={handleChange}
          />
          <input
            className="sg-auth__input"
            type="text"
            name="studentIdNumber"
            placeholder="Student ID Number"
            value={formData.studentIdNumber}
            onChange={handleChange}
          />
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
          <button className="sg-auth__btn sg-auth__btn--primary" type="submit">
            Create Account
          </button>
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
