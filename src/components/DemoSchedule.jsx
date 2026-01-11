import { Link } from "react-router-dom";
import React from "react";
import "./DemoSchedule.css";

const demoSchedule = [
  { subject: "Clinical Data Management", time: "Today, 7:00 PM IST" },
  { subject: "Clinical Research (GCP)", time: "Tomorrow, 5:00 PM IST" },
  { subject: "Pharmacovigilance", time: "Wednesday, 8:00 PM IST" },
];

const DemoSchedule = () => {
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
            <Link to="/Register" className="register-button">
              Register Now →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoSchedule;
