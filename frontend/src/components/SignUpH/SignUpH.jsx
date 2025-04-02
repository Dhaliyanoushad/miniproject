import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const SignUpH = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  // Handle input change
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Side: Background */}
      <div className="hidden md:block w-1/2 bg-gradient-to-r from-purple-600 to-indigo-700"></div>

      {/* Right Side: Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create Host Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Password Field with Eye Icon */}
            <div className="relative w-full">
              <input
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span
                className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-200"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
            />

            <input
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 w-5 h-5 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I agree with{" "}
                <a href="#" className="text-indigo-400">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-400">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
              type="submit"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <span
                className="text-indigo-400 cursor-pointer hover:underline"
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
