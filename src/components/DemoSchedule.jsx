// File: components/DemoSchedule.js

import React from 'react';
import './DemoSchedule.css';
const demoSchedule = [
    { subject: "Advanced Mathematics", time: "Today, 7:00 PM IST", link: "#" },
    { subject: "Clinical Research (GCP)", time: "Tomorrow, 5:00 PM IST", link: "#" },
    { subject: "Protocol Drafting Workshop", time: "Wednesday, 8:00 PM IST", link: "#" },
];

const DemoSchedule = () => {
    return (
        <div className="demo-schedule-section">
            <h2 className="schedule-header">🎉 Try Before You Buy: Free Live Demos</h2>
            <div className="demo-list-container">
                {demoSchedule.map((demo, index) => (
                    <div key={index} className="demo-item">
                        <div className="demo-info">
                            <span className="demo-icon">📅</span>
                            <p>
                                **{demo.subject}**
                                <small className="demo-time"> | {demo.time}</small>
                            </p>
                        </div>
                        <a href={demo.link} className="register-button">
                            Register Now →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DemoSchedule;