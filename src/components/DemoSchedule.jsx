import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthContext"; // your auth context
import { toast } from "react-toastify";
import "./DemoSchedule.css";

const demoSchedule = [
  { subject: "Clinical Data Management", time: "Today, 7:00 PM IST" },
  { subject: "Clinical Research (GCP)", time: "Tomorrow, 5:00 PM IST" },
  { subject: "Pharmacovigilance", time: "Wednesday, 8:00 PM IST" },
];

const DemoSchedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

const handleRegisterClick = () => {
  if (!user) {
    toast.info("Please login to register 🔐");
    // pass current location to login page
    navigate("/login", { state: { from: window.location.pathname } });
    return;
  }
  navigate("/register");
};

  return (
    <div className="demo-schedule-section" id="demo">
      <h2 className="schedule-header">🎉 Try Before You Buy: Free Live Demos</h2>
      <div className="demo-list-container">
        {demoSchedule.map((demo, index) => (
          <div key={index} className="demo-item">
            <div className="demo-info">
              <span className="demo-icon">📅</span>
              <p>
                <strong>{demo.subject}</strong>
                <small className="demo-time"> | {demo.time}</small>
              </p>
            </div>
            {/* ❌ Don't use Link, use button with click handler */}
            <button
              onClick={handleRegisterClick}
              className="register-button"
            >
              Register Now →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoSchedule;
