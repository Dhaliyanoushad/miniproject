import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("pending"); // Track active section
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hosts from API when component mounts
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/hosts");
        setHosts(response.data);
      } catch (err) {
        console.error("Failed to fetch hosts:", err);
        setError(err.response?.data?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  const handleApproval = async (hostId) => {
    try {
      await axios.patch(`http://localhost:8000/api/hosts/${hostId}`, {
        is_approved: 1,
      });

      setHosts((prevHosts) =>
        prevHosts.map((host) =>
          host.host_id === hostId ? { ...host, is_approved: 1 } : host
        )
      );
    } catch (err) {
      console.error("Error updating host status:", err);
      setError(err.response?.data?.message || "Failed to update host status");
    }
  };

  const handleReject = async (hostId) => {
    try {
      await axios.delete(`http://localhost:8000/api/hosts/${hostId}`);

      // Remove host from state after deletion
      setHosts((prevHosts) =>
        prevHosts.filter((host) => host.host_id !== hostId)
      );
    } catch (err) {
      console.error("Error deleting host:", err);
      setError(err.response?.data?.message || "Failed to delete host.");
    }
  };

  const handleSidebarClick = (section) => {
    setSelectedSection(section);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-[#261646] to-[#7A3B69]">
        <div className="text-white text-xl">Loading host data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-t from-[#261646] to-[#7A3B69]">
        <div className="text-white text-xl bg-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#261646] text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <button
              className={`text-[#D7DEDC] hover:text-[#866A9A] ${
                selectedSection === "pending" ? "font-bold text-[#866A9A]" : ""
              }`}
              onClick={() => handleSidebarClick("pending")}
            >
              Pending Requests
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`text-[#D7DEDC] hover:text-[#866A9A] ${
                selectedSection === "approved" ? "font-bold text-[#866A9A]" : ""
              }`}
              onClick={() => handleSidebarClick("approved")}
            >
              Approved Requests
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gradient-to-t from-[#261646] to-[#7A3B69]">
        <h1 className="text-3xl text-white font-bold mb-6">
          {selectedSection === "approved"
            ? "Approved Hosts"
            : "Pending Requests"}
        </h1>

        {/* Pending Hosts Section */}
        {selectedSection === "pending" && (
          <div id="pending" className="mb-6">
            {hosts.filter((host) => host.is_approved === 0).length === 0 ? (
              <div className="bg-[#7A3B69] p-6 rounded-md text-white">
                No pending requests found.
              </div>
            ) : (
              hosts
                .filter((host) => host.is_approved === 0)
                .map((host) => (
                  <div
                    key={host.host_id}
                    className="bg-[#7A3B69] p-6 rounded-md mb-4"
                  >
                    <h3 className="text-white font-semibold">
                      {host.fullname}
                    </h3>
                    <div className="text-[#D2CCE7] mt-4">
                      <div>Email: {host.email}</div>
                      <div>Phone: {host.phone_number}</div>
                      <div>Department: {host.department}</div>
                      <div>Created: {formatDate(host.created_at)}</div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => handleApproval(host.host_id)}
                        className="bg-[#866A9A] text-white py-2 px-4 rounded-md mr-4 hover:bg-[#7A3B69] transition duration-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(host.host_id)}
                        className="bg-[#7A3B69] text-white py-2 px-4 rounded-md hover:bg-[#563440] transition duration-300"
                      >
                        Reject & Delete
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {/* Approved Hosts Section */}
        {selectedSection === "approved" && (
          <div id="approved" className="mb-6">
            {hosts.filter((host) => host.is_approved === 1).length === 0 ? (
              <div className="bg-[#9A879D] p-6 rounded-md text-white">
                No approved hosts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hosts
                  .filter((host) => host.is_approved === 1)
                  .map((host) => (
                    <div
                      key={host.host_id}
                      className="bg-[#9A879D] text-white p-6 rounded-lg shadow-md"
                    >
                      <h3 className="text-xl font-semibold">{host.fullname}</h3>
                      <div className="mt-4">
                        <div className="text-sm text-[#D2CCE7]">
                          Email: {host.email}
                        </div>
                        <div className="text-sm text-[#D2CCE7]">
                          Phone: {host.phone_number}
                        </div>
                        <div className="text-sm text-[#D2CCE7]">
                          Department: {host.department}
                        </div>
                        <div className="text-sm text-[#D2CCE7]">
                          Created: {formatDate(host.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
