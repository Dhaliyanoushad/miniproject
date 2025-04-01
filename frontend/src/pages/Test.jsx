import React, { useState } from "react";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("pending"); // To track which section is active
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Host 1",
      email: "host1@example.com",
      phone: "123-456-7890",
      department: "Arts",
      description: "Painting request for a new artwork",
      status: null,
    },
    {
      id: 2,
      name: "Host 2",
      email: "host2@example.com",
      phone: "234-567-8901",
      department: "Design",
      description: "Painting request for mural project",
      status: null,
    },
    {
      id: 3,
      name: "Host 3",
      email: "host3@example.com",
      phone: "345-678-9012",
      department: "Music",
      description: "Request for portrait painting",
      status: null,
    },
  ]);

  const handleApproval = (id, action) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: action } : request
      )
    );
  };

  const handleReject = (id) => {
    // Permanently delete the rejected host
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
  };

  const handleSidebarClick = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#261646] text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a
              href="#pending"
              className={`text-[#D7DEDC] hover:text-[#866A9A] ${
                selectedSection === "pending" ? "font-bold text-[#866A9A]" : ""
              }`}
              onClick={() => handleSidebarClick("pending")}
            >
              PendingRequest
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#approved"
              className={`text-[#D7DEDC] hover:text-[#866A9A] ${
                selectedSection === "approved" ? "font-bold text-[#866A9A]" : ""
              }`}
              onClick={() => handleSidebarClick("approved")}
            >
              ApprovedRequest
            </a>
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
            {requests
              .filter((request) => request.status === null)
              .map((request) => (
                <div
                  key={request.id}
                  className="bg-[#7A3B69] p-6 rounded-md mb-4"
                >
                  <h3 className="text-white font-semibold">{request.name}</h3>
                  <p className="text-[#D2CCE7]">{request.description}</p>
                  <div className="text-[#D2CCE7] mt-4">
                    <div>Email: {request.email}</div>
                    <div>Phone: {request.phone}</div>
                    <div>Department: {request.department}</div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleApproval(request.id, "approved")}
                      className="bg-[#866A9A] text-white py-2 px-4 rounded-md mr-4 hover:bg-[#7A3B69] transition duration-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="bg-[#7A3B69] text-white py-2 px-4 rounded-md hover:bg-[#563440] transition duration-300"
                    >
                      Reject & Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Approved Hosts Section */}
        {selectedSection === "approved" && (
          <div id="approved" className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests
                .filter((request) => request.status === "approved")
                .map((request) => (
                  <div
                    key={request.id}
                    className="bg-[#9A879D] text-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold">{request.name}</h3>
                    <p className="text-[#D2CCE7]">{request.description}</p>
                    <div className="mt-4">
                      <div className="text-sm text-[#D2CCE7]">
                        Email: {request.email}
                      </div>
                      <div className="text-sm text-[#D2CCE7]">
                        Phone: {request.phone}
                      </div>
                      <div className="text-sm text-[#D2CCE7]">
                        Department: {request.department}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
