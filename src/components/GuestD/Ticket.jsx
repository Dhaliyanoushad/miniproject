import React from "react";

const Ticket = ({ guestName, event, onClose }) => {
  // Generate a random ticket number
  const ticketNumber = `TKT-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  // Calculate QR code placeholder position
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#1a1428] to-[#2a1a3a] rounded-xl overflow-hidden w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Ticket header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Event Ticket</h2>
        </div>

        {/* Ticket content */}
        <div className="p-6">
          {/* Event name */}
          <h3 className="text-2xl font-bold text-white mb-4">{event.name}</h3>

          {/* Event details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Date:</span>
              <span className="text-white font-medium">{event.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Location:</span>
              <span className="text-white font-medium">{event.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${
                  event.status === "Confirmed"
                    ? "text-green-300"
                    : "text-yellow-300"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Attendee:</span>
              <span className="text-white font-medium">{guestName}</span>
            </div>
          </div>

          {/* Ticket number */}
          <div className="bg-white/5 rounded-lg p-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-400">Ticket #:</span>
              <span className="text-white font-mono">{ticketNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Issued:</span>
              <span className="text-white">{currentDate}</span>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg w-40 h-40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-black text-xs mb-2">Scan for entry</div>
                <div className="border-2 border-black w-32 h-32 flex items-center justify-center">
                  <span className="text-black text-xs">QR Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket footer */}
        <div className="border-t border-purple-500/20 p-4 flex justify-between">
          <button
            onClick={() => window.print()}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition text-white"
          >
            Print Ticket
          </button>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:from-purple-500 hover:to-indigo-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
