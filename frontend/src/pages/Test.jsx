import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  MapPin,
  Users,
  Clock,
} from "lucide-react";

// Mock data - in a real application, this would come from an API
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference",
    host: "John Doe",
    date: "2024-07-15",
    venue: "Tech Hall",
    maxParticipants: 200,
    currentParticipants: 150,
    status: "pending",
  },
  {
    id: 2,
    title: "Art Workshop",
    host: "Jane Smith",
    date: "2024-08-20",
    venue: "Creative Center",
    maxParticipants: 50,
    currentParticipants: 30,
    status: "pending",
  },
  {
    id: 3,
    title: "Music Festival",
    host: "Mike Johnson",
    date: "2024-09-10",
    venue: "Open Ground",
    maxParticipants: 500,
    currentParticipants: 450,
    status: "approved",
  },
];

const AdminDashboard = () => {
  // State Management
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [filters, setFilters] = useState({
    host: "",
    venue: "",
    dateFrom: "",
    dateTo: "",
    status: "all",
  });

  // Event Approval/Rejection Handlers
  const handleApproveEvent = (eventId) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, status: "approved" } : event
    );
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  const handleRejectEvent = (eventId) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, status: "rejected" } : event
    );
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
  };

  // Filtering Logic
  const applyFilters = () => {
    let result = events;

    if (filters.host) {
      result = result.filter((event) =>
        event.host.toLowerCase().includes(filters.host.toLowerCase())
      );
    }

    if (filters.venue) {
      result = result.filter((event) =>
        event.venue.toLowerCase().includes(filters.venue.toLowerCase())
      );
    }

    if (filters.dateFrom && filters.dateTo) {
      result = result.filter(
        (event) =>
          event.date >= filters.dateFrom && event.date <= filters.dateTo
      );
    }

    if (filters.status !== "all") {
      result = result.filter((event) => event.status === filters.status);
    }

    setFilteredEvents(result);
  };

  // Trigger filtering when filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#d2cce7] p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#b8a0c9]">
        Admin Dashboard - Event Management
      </h1>

      {/* Filters Section */}
      <div className="bg-[#1a1a1d] p-6 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Host Filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#866a9a]" />
            <input
              type="text"
              placeholder="Filter by Host"
              value={filters.host}
              onChange={(e) => setFilters({ ...filters, host: e.target.value })}
              className="w-full pl-10 px-3 py-2 bg-[#0f0f10] border border-[#5c4b73]/50 rounded-md text-[#d2cce7]"
            />
          </div>

          {/* Venue Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#866a9a]" />
            <input
              type="text"
              placeholder="Filter by Venue"
              value={filters.venue}
              onChange={(e) =>
                setFilters({ ...filters, venue: e.target.value })
              }
              className="w-full pl-10 px-3 py-2 bg-[#0f0f10] border border-[#5c4b73]/50 rounded-md text-[#d2cce7]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 bg-[#0f0f10] border border-[#5c4b73]/50 rounded-md text-[#d2cce7]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#866a9a]" />
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="w-full pl-10 px-3 py-2 bg-[#0f0f10] border border-[#5c4b73]/50 rounded-md text-[#d2cce7]"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#866a9a]" />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
              className="w-full pl-10 px-3 py-2 bg-[#0f0f10] border border-[#5c4b73]/50 rounded-md text-[#d2cce7]"
            />
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#1a1a1d] p-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold text-[#b8a0c9]">
                {event.title}
              </h2>
              <div className="flex items-center space-x-4 mt-2 text-sm">
                <span className="flex items-center">
                  <Users className="mr-2 w-4 h-4" />
                  {event.currentParticipants}/{event.maxParticipants}
                </span>
                <span className="flex items-center">
                  <MapPin className="mr-2 w-4 h-4" />
                  {event.venue}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-2 w-4 h-4" />
                  {event.date}
                </span>
                <span
                  className={`
                  px-2 py-1 rounded-full text-xs
                  ${
                    event.status === "pending"
                      ? "bg-yellow-600/20 text-yellow-400"
                      : event.status === "approved"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }
                `}
                >
                  {event.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {event.status === "pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApproveEvent(event.id)}
                  className="bg-green-600/20 text-green-400 p-2 rounded-full hover:bg-green-600/40"
                >
                  <CheckCircle2 />
                </button>
                <button
                  onClick={() => handleRejectEvent(event.id)}
                  className="bg-red-600/20 text-red-400 p-2 rounded-full hover:bg-red-600/40"
                >
                  <XCircle />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
