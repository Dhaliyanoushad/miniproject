import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import BookTicket from "./pages/BookTicket";
import Test from "./pages/Test";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />

          <Route path="/test" element={<Test />} />

          {/* Host  Dashboard*/}
          <Route path="/hostdashboard" element={<HostDashboard />} />
          <Route path="/newevent" element={<NewEvent />} />
          <Route path="/editevent" element={<EditEvent />} />

          {/* Guest Dashboard */}
          <Route path="/guestdashboard" element={<GuestDashboard />} />
          <Route path="/bookticket" element={<BookTicket />} />
          {/* Register Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/loginhost" element={<LoginHost />} />
          <Route path="/signuphost" element={<SignUpHost />} />
          <Route path="/loginguest" element={<LoginGuest />} />
          <Route path="/signupguest" element={<SignUpGuest />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
