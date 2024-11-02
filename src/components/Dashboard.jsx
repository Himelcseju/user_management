import React from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

function Dashboard() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="border rounded-lg p-4"
        style={{ width: "500px", height: "400px" }}
      >
        <h2 className="mb-4 text-center">Welcome to Dashboard</h2>
        <p className="mb-4 text-center">Hello,</p>
        <p className="text-center">You are logged in successfully.</p>
        <div className="text-center"></div>
      </div>
    </div>
  );
}

export default Dashboard;
