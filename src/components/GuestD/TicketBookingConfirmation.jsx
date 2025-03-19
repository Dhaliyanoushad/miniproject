import React, { useState } from "react";

const TicketBookingConfirmation = ({ event, onClose, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [attendeeInfo, setAttendeeInfo] = useState({
    email: "",
    phone: "",
    specialRequirements: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendeeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onConfirm({
        ...event,
        status: "Confirmed",
        attendeeInfo,
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-[#2a1a3a] to-[#1a1025] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-6 p-4 rounded-lg bg-white/5 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
          <div className="space-y-1 text-gray-300">
            <p>{event.date}</p>
            <p>{event.location}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={attendeeInfo.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={attendeeInfo.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Special Requirements
            </label>
            <textarea
              name="specialRequirements"
              value={attendeeInfo.specialRequirements}
              onChange={handleInputChange}
              placeholder="Any dietary restrictions or accessibility needs?"
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-500/20 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/40 min-h-24"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || !attendeeInfo.email}
            className={`flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium transition ${
              isLoading || !attendeeInfo.email
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg hover:from-purple-500 hover:to-indigo-500"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingConfirmation;
