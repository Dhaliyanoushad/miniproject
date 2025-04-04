import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import LoginHost from "./pages/LoginHost";
import SignUpHost from "./pages/SignUpHost";
import LoginGuest from "./pages/LoginGuest";
import SignUpGuest from "./pages/SignUpGuest";
import HostDashboard from "./pages/HostDashboard";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import GuestDashboard from "./pages/GuestDashboard";
import SuperAdminDashboard from "./pages/SuperAdmin";
import Test from "./pages/Test";
import ProtectedRoute from "./components/protected";

// Preloader Component
const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-[#1a1624] flex flex-col items-center justify-center z-50">
      <div className="relative w-32 h-32 mb-6">
        {/* Animated geometric shapes */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="absolute w-8 h-8 bg-[#351d80] animate-bounce delay-100"></div>
          <div className="absolute w-12 h-12 bg-[#5e28ff] opacity-50 rotate-45 animate-ping delay-300"></div>
          <div className="absolute w-16 h-16 border-4 border-[#5c1d80] rotate-12 animate-pulse"></div>
          <div className="absolute w-20 h-20 border-2 border-dashed border-white opacity-30 animate-spin"></div>
        </div>

        {/* Central logo element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-10">
            <div className="w-4 h-4 bg-gradient-to-r from-[#351d80] to-[#5e28ff] rounded-full"></div>
          </div>
        </div>
      </div>

      <h2 className="text-white text-3xl font-bold tracking-wider animate-pulse duration-1000">
        <span className="text-[#7856dd]">Ef</span>
        <span className="text-white">fo</span>
        <span className="text-[#5c1d80]">rst</span>
      </h2>

      <p className="text-white text-sm mt-4 opacity-80 tracking-widest font-light">
        LOADING EXPERIENCE
      </p>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for resources to load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop />
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <Routes>
            {/* Main Routes */}
            <Route path="/superadmindashboard" element={<Test />} />
            <Route
              path={`/${import.meta.env.VITE_SUPER_ADMIN}`}
              element={<SuperAdminDashboard />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetails />} />
            {/* Host Dashboard*/}
            <Route element={<ProtectedRoute />}>
              <Route path="/hostdashboard" element={<HostDashboard />} />
              <Route path="/guestdashboard" element={<GuestDashboard />} />
            </Route>{" "}
            <Route path="/newevent" element={<NewEvent />} />
            <Route path="/editevent/:event_id" element={<EditEvent />} />{" "}
            {/* Guest Dashboard */}
            {/* Register Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/loginhost" element={<LoginHost />} />
            <Route path="/signuphost" element={<SignUpHost />} />
            <Route path="/loginguest" element={<LoginGuest />} />
            <Route path="/signupguest" element={<SignUpGuest />} />
          </Routes>
        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
