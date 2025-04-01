import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import axios from "axios";

const AdminHostApproval = () => {
  const [hosts, setHosts] = useState([]);

  // Fetch pending hosts
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/hosts/pending"
        );
        setHosts(response.data);
      } catch (error) {
        console.error("Error fetching hosts:", error);
      }
    };

    fetchHosts();
  }, []);

  // Approve host
  const handleApprove = async (hostId) => {
    try {
      await axios.patch(`http://localhost:8000/api/hosts/${hostId}/approve`);
      setHosts((prev) => prev.filter((host) => host.id !== hostId)); // Remove from list
    } catch (error) {
      console.error("Error approving host:", error);
    }
  };

  // Reject host
  const handleReject = async (hostId) => {
    try {
      await axios.patch(`http://localhost:8000/api/hosts/${hostId}/reject`);
      setHosts((prev) => prev.filter((host) => host.id !== hostId)); // Remove from list
    } catch (error) {
      console.error("Error rejecting host:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-[#d2cce7] p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#b8a0c9]">
        Admin - Host Approvals
      </h1>

      <div className="grid gap-4">
        {hosts.length > 0 ? (
          hosts.map((host) => (
            <div
              key={host.id}
              className="bg-[#1a1a1d] p-6 rounded-xl flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold text-[#b8a0c9]">
                  {host.full_name}
                </h2>
                <p className="text-sm text-[#866a9a]">{host.email}</p>
                <p className="text-sm text-[#866a9a]">{host.occupation}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(host.id)}
                  className="bg-green-600/20 text-green-400 p-2 rounded-full hover:bg-green-600/40"
                >
                  <CheckCircle2 />
                </button>
                <button
                  onClick={() => handleReject(host.id)}
                  className="bg-red-600/20 text-red-400 p-2 rounded-full hover:bg-red-600/40"
                >
                  <XCircle />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#866a9a]">
            No pending hosts for approval.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminHostApproval;
