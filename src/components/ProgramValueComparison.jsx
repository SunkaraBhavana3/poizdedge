// File: components/ProgramValueComparison.js

import React from 'react';
import './ProgramValueComparison.css';
const comparisonData = [
    { 
        type: "Online Course", 
        price: "Starting at $49", 
        access: "3 Months", 
        support: "Community Forums", 
        key: "Self-paced flexibility" 
    },
    { 
        type: "Live Classes", 
        price: "$199 / Month", 
        access: "Full Year", 
        support: "Live Q&A Sessions", 
        key: "Scheduled structure & interaction" 
    },
    { 
        type: "Premium Mentorship", 
        price: "$499 / Month", 
        access: "Lifetime", 
        support: "1:1 Instructor Chat", 
        key: "Personalized career guidance" 
    },
];

const ProgramValueComparison = () => {
    return (
        <div className="value-comparison-section">
            <h2>Choose Your Path to Mastery</h2>
            <p className="value-subtitle">Select the learning format that fits your pace, budget, and goals.</p>
            
            <div className="comparison-grid">
                {comparisonData.map((item, index) => (
                    <div key={index} className={`comparison-card card-${index + 1}`}>
                        <div className="card-header">
                            <span className="badge">{item.type}</span>
                            <h3 className="price-tag">{item.price}</h3>
                        </div>
                        <ul className="feature-list">
                            <li><span className="check">✔</span> **Access:** {item.access}</li>
                            <li><span className="check">✔</span> **Support:** {item.support}</li>
                            <li><span className="check">✔</span> **Key Feature:** {item.key}</li>
                        </ul>
                        <button className="cta-button">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgramValueComparison;