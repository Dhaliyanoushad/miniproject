import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, UserIcon } from "lucide-react";
import axios from "axios";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both Username and Password.");
      return;
    }

    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
      const response = await axios.post(`${baseUrl}/auth/loginadmin`, {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/superadmindashboard");
      } else {
        setError(response.data.msg || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/736x/86/ad/ee/86adee567af1a5aafb594a2ea1e02b7e.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-[#040405]/90"></div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md bg-[#0f0f10] p-10 rounded-2xl shadow-2xl border border-[#5c4b73]/30 backdrop-blur-sm">
        <div className="space-y-6">
          {/* Elegant Logo Placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#5c4b73]/20 rounded-full flex items-center justify-center">
              <LockIcon
                className="w-10 h-10 text-[#b8a0c9]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-[#b8a0c9] tracking-tight">
            Admin Portal
          </h1>
          <p className="text-sm text-center text-[#9a879d] mb-6">
            Secure Access Required
          </p>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <UserIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#866a9a]"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 px-3 py-3 bg-[#1a1a1d] border border-[#5c4b73]/50 text-[#d2cce7] 
                           rounded-xl text-sm focus:outline-none focus:border-[#866a9a] 
                           focus:ring-2 focus:ring-[#866a9a]/50 transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#866a9a]"
                strokeWidth={1.5}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-3 py-3 bg-[#1a1a1d] border border-[#5c4b73]/50 text-[#d2cce7] 
                           rounded-xl text-sm focus:outline-none focus:border-[#866a9a] 
                           focus:ring-2 focus:ring-[#866a9a]/50 transition duration-300"
              />
            </div>

            {/* Remember Me & Forgot Password
            <div className="flex justify-between items-center text-sm text-[#b8a0c9]">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded focus:ring-[#866a9a] text-[#866a9a]"
                />
                <span className="select-none">Remember me</span>
              </label>
              
            </div> */}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full py-3 mt-4 bg-[#5c4b73] text-white rounded-lg 
                     hover:bg-[#866a9a] transition duration-300
                     disabled:bg-[#5c4b73]/50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Secure Login"}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-xs text-center text-[#9a879d] mt-6">
            © 2024 Admin Portal. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
