import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye <icons></icons>

const SignUpG = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    college_name: "",
    student_id: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, email, password, college_name, student_id } = formData;
    if (!full_name || !email || !password || !college_name || !student_id) {
      alert("Please fill all the fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signupguest`,
        formData
      );
      alert(response.data.msg);
      // localStorage.setItem("guest", JSON.stringify(response.data.guest));
      // localStorage.setItem("token", response.data.token);
      navigate("/loginguest");

      console.log(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#040405] shadow-lg">
      {/* Left Side */}
      <div
        className="flex-1 bg-cover bg-center text-white p-10"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/7a/40/07/7a4007251e2ded3352a0ff7e3eb1636b.jpg')",
        }}
      ></div>

      {/* Right Side */}
      <div className="flex-1 p-14 bg-[#0f0f10] flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-[#b8a0c9]">
          Create Guest Account
        </h2>
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
          <input
            className="w-full p-3 border border-[#5c4b73] rounded-md bg-[#1a1a1d] text-[#d2cce7] focus:outline-none focus:ring-2 focus:ring-[#866a9a]"
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-[#5c4b73] rounded-md bg-[#1a1a1d] text-[#d2cce7] focus:outline-none focus:ring-2 focus:ring-[#866a9a]"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Password Field with Eye Icon */}
          <div className="relative w-full">
            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-200"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            className="w-full p-3 border border-[#5c4b73] rounded-md bg-[#1a1a1d] text-[#d2cce7] focus:outline-none focus:ring-2 focus:ring-[#866a9a]"
            type="text"
            name="college_name"
            placeholder="College Name"
            value={formData.college_name}
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border border-[#5c4b73] rounded-md bg-[#1a1a1d] text-[#d2cce7] focus:outline-none focus:ring-2 focus:ring-[#866a9a]"
            type="text"
            name="student_id"
            placeholder="Student ID Number"
            value={formData.student_id}
            onChange={handleChange}
          />
          <div className="flex items-center text-[#b8a0c9] text-sm">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms">
              I agree with{" "}
              <a href="#" className="text-[#9a879d]">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#9a879d]">
                Privacy Policy
              </a>
            </label>
          </div>
          <button className="w-full p-3 bg-[#5c4b73] text-white rounded-md mt-4 hover:bg-[#866a9a] transition-all">
            Create Account
          </button>
          <p className="mt-4 text-sm text-center text-[#b8a0c9]">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/loginguest")}
              className="text-[#9a879d] hover:underline cursor-pointer"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpG;
