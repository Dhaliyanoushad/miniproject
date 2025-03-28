import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1A1A2E] text-gray-400 py-6 flex flex-col items-center text-center w-full">
      <div className="max-w-sm w-full">
        <div className="text-lg font-semibold text-purple-300 mb-3">
          CAMPUS EVENTS
        </div>

        <nav className="flex flex-wrap justify-center gap-4 mb-3 text-sm">
          <a href="/events" className="hover:text-purple-400 transition">
            Events
          </a>
          <a href="/register" className="hover:text-purple-400 transition">
            Register
          </a>
          <a href="/signuphost" className="hover:text-purple-400 transition">
            Host
          </a>
          <a href="#about" className="hover:text-purple-400 transition">
            About
          </a>
        </nav>

        <div className="text-xs flex flex-col items-center gap-1">
          <span>© 2025 Campus Events</span>
          <div className="flex gap-4">
            <a
              target="_blank"
              href="https://imgs.search.brave.com/DJEhAl0SBvKnmGZ4QGa7uQYryvcsBBnHPIAllpaABfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90cm9s/bG1lbWVtYWxheWFs/YW0uaW4vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTcvMTAvSmF5/YXJhbS1TYWQtQ3J5/aW5nLU1lbWUtRG93/bmxvYWQtZnJvbS1V/dGhhbWFuLmpwZw"
              // href="https://imgs.search.brave.com/Y-RhUCxuLSxP1-xpqH1jx9cftTetvLMId0kPulHtrV4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzc0LzEyLzI1/LzM2MF9GXzc0MTIy/NTQ4X1VvYXFMdmxm/aDJyc05BUlpKTEFZ/SllETEtRM09LMEhl/LmpwZw"
              className="hover:text-purple-400 transition"
            >
              Terms
            </a>
            <a
              target="_blank"
              href="https://imgs.search.brave.com/F1Q_3On5PMdt8eiqqSSQxuBYwON8PBI9m0YLYdmCAfw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/dGhld2Vlay5pbi9j/b250ZW50L2RhbS93/ZWVrL3Jldmlldy9t/b3ZpZXMvaW1hZ2Vz/LzIwMTkvMi84L2t1/bWJhbGFuZ2ktbmln/aHRzLWZhaGFkaC5q/cGc"
              // href="https://imgs.search.brave.com/tQzct-SCWxDUAMe6wwMUAeUc0DcE88tS2eFzzhgQrWU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDk3/MjYwNjIyL3Bob3Rv/L2RhdGEtcHJpdmFj/eS1yaXNrcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Z0Vt/SFE4ZTcxLVU1QzZE/Yk1ZUTFhS1Jfd0Vx/enZKdzFFZWg1VWV3/R3RNUT0"
              className="hover:text-purple-400 transition"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
