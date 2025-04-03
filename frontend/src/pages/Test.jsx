import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminHostManagement = () => {
  const [pendingHosts, setPendingHosts] = useState([]);
  const [approvedHosts, setApprovedHosts] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hosts data
  const fetchHosts = async () => {
    setLoading(true);
    try {
      const [pendingResponse, approvedResponse] = await Promise.all([
        axios.get("http://localhost:5000/admins/pending"),
        axios.get("http://localhost:5000/admins/verified"),
      ]);

      // Check if the response structure includes a nested 'hosts' property
      const pendingHostsData =
        pendingResponse.data.hosts || pendingResponse.data;
      const approvedHostsData =
        approvedResponse.data.hosts || approvedResponse.data;

      setPendingHosts(pendingHostsData);
      setApprovedHosts(approvedHostsData);
      setError(null);
    } catch (error) {
      console.error("Error fetching hosts:", error);
      setError("Failed to load hosts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  // Approve host
  const handleApprove = async (hostId) => {
    try {
      // Find the approved host in pendingHosts
      const approvedHost = pendingHosts.find((host) => host._id === hostId);
      if (!approvedHost) {
        alert("Host not found in pending list.");
        return;
      }

      // Optimistically update state
      setPendingHosts((prev) => prev.filter((host) => host._id !== hostId));
      setApprovedHosts((prev) => [...prev, approvedHost]);

      // Send the approval request to the backend
      await axios.patch(`http://localhost:5000/admins/verify/${hostId}`);

      // Optionally, refresh data to ensure consistency
      fetchHosts();
    } catch (error) {
      console.error("Error approving host:", error);
      alert("Failed to approve host. Please try again.");

      // Revert optimistic update in case of failure
      fetchHosts();
    }
  };

  // Reject host
  const handleReject = async (hostId) => {
    try {
      // Find the rejected host in approvedHosts
      const rejectedHost = approvedHosts.find((host) => host._id === hostId);
      if (!rejectedHost) {
        alert("Host not found in approved list.");
        return;
      }

      // Optimistically update state
      setApprovedHosts((prev) => prev.filter((host) => host._id !== hostId));
      setPendingHosts((prev) => [...prev, rejectedHost]);

      // Send the rejection request to the backend
      await axios.patch(`http://localhost:5000/admins/reject/${hostId}`);

      // Optionally, refresh data to ensure consistency
      fetchHosts();
    } catch (error) {
      console.error("Error rejecting host:", error);
      alert("Failed to reject host. Please try again.");

      // Revert optimistic update in case of failure
      fetchHosts();
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Call logout endpoint
      await axios.post(
        "http://localhost:5000/admins/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Navigate to login page regardless of success/failure
      navigate("/admin");
    }
  };

  // Delete host with simple confirmation
  const handleDelete = async (hostId) => {
    // Simple confirmation popup
    if (window.confirm("Are you sure you want to delete this host?")) {
      try {
        await axios.delete(`http://localhost:5000/admins/host/${hostId}`);
        // Refresh data after deletion
        fetchHosts();
      } catch (error) {
        console.error("Error deleting host:", error);
        alert("Failed to delete host. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center items-center">
        <p className="text-xl text-purple-300">Loading hosts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center items-center">
        <p className="text-xl text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-300">
        Admin - Host Management
      </h1>

      {/* Tab navigation */}
      <div className="flex space-x-4 mb-6 relative">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "pending"
              ? "bg-purple-700 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Pending Hosts ({pendingHosts.length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 rounded-lg ${
            activeTab === "approved"
              ? "bg-purple-700 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Approved Hosts ({approvedHosts.length})
        </button>

        <button
          onClick={handleLogout}
          className="absolute right-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700  align-right"
        >
          Logout
        </button>
      </div>

      {/* Pending Hosts Section */}
      {activeTab === "pending" && (
        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold mb-2 text-purple-300">
            Pending Approval
          </h2>

          {pendingHosts.length > 0 ? (
            pendingHosts.map((host) => (
              <div
                key={host._id}
                className="bg-gray-800 p-6 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold text-purple-300">
                    {host.fullName || host.full_name}
                  </h2>
                  <p className="text-sm text-purple-200">{host.email}</p>
                  <p className="text-sm text-purple-200">{host.department}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted: {new Date(host.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(host._id)}
                    className="bg-green-600/20 text-green-400 p-2 rounded-full hover:bg-green-600/40"
                    title="Approve Host"
                  >
                    <CheckCircle2 size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(host._id)}
                    className="bg-red-600/20 text-red-400 p-2 rounded-full hover:bg-red-600/40"
                    title="Reject Host"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">
              No pending hosts for approval.
            </p>
          )}
        </div>
      )}

      {/* Approved Hosts Section */}
      {activeTab === "approved" && (
        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold mb-2 text-purple-300">
            Verified Hosts
          </h2>

          {approvedHosts.length > 0 ? (
            approvedHosts.map((host) => (
              <div
                key={host._id}
                className="bg-gray-800 p-6 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold text-purple-300">
                    {host.fullName || host.full_name}
                  </h2>
                  <p className="text-sm text-purple-200">{host.email}</p>
                  <p className="text-sm text-purple-200">{host.department}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Verified: {new Date(host.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReject(host._id)}
                    className="bg-yellow-600/20 text-yellow-400 p-2 rounded-full hover:bg-yellow-600/40"
                    title="Remove Verification"
                  >
                    <XCircle size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(host._id)}
                    className="bg-red-600/20 text-red-400 p-2 rounded-full hover:bg-red-600/40"
                    title="Delete Host"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 py-8">
              No approved hosts found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHostManagement;
