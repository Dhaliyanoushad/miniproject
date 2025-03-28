import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, UserIcon } from "lucide-react";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log("Login attempt:", username);
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

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm text-[#b8a0c9]">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded focus:ring-[#866a9a] text-[#866a9a]"
                />
                <span className="select-none">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#9a879d] hover:text-[#b8a0c9] transition duration-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={() => navigate("/superadmindashboard")}
              className="w-full py-3 mt-6 bg-[#5c4b73] text-white rounded-xl 
                         hover:bg-[#866a9a] transition duration-300 text-base 
                         transform hover:-translate-y-1 hover:shadow-xl"
            >
              Secure Login
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
