import React, { useState } from "react";

const UpdateStatus = () => {
  const [status, setStatus] = useState("pending"); // Example status

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Status
        </h1>

        {/* Current Status */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Current Status
          </h2>
          <span
            className={`inline-block px-4 py-2 rounded-full font-medium ${getStatusClass(
              status
            )}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        {/* Update Status Options */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Status
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleStatusChange("pending")}
              className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition"
            >
              Pending
            </button>
            <button
              onClick={() => handleStatusChange("in-progress")}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              In Progress
            </button>
            <button
              onClick={() => handleStatusChange("completed")}
              className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition"
            >
              Completed
            </button>
            <button
              onClick={() => handleStatusChange("cancelled")}
              className="bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition"
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;