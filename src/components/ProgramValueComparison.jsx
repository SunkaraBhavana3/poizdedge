import React, { useEffect } from 'react';

// // --- Styles Injection Function (Replacing ProgramValueComparison.css) ---
// const injectStyles = () => {
//     const css = `
//     /* General Styles */
//     body {
//         font-family: 'Inter', sans-serif;
//         background-color: #f5f7fa;
//         margin: 0;
//         padding: 0;
//     }

//     .value-comparison-section {
//         max-width: 1200px;
//         margin: 60px auto;
//         padding: 20px;
//         text-align: center;
//     }

//     .value-comparison-section h2 {
//         font-size: 2.25rem;
//         font-weight: 800;
//         color: #333; /* Slightly darker main color */
//         margin-bottom: 10px;
//     }

//     .value-subtitle {
//         font-size: 1.1rem;
//         color: #666;
//         margin-bottom: 40px;
//     }

//     /* Comparison Grid */
//     .comparison-grid {
//         display: grid;
//             grid-template-columns: repeat(2, 1fr); 
//         gap: 25px;
//         align-items: stretch;
//     }

//     /* Comparison Card */
//     .comparison-card {
//         background-color: white;
//         border-radius: 12px;
//         border: 1px solid #e0e0e0; 
//         box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); /* Lighter shadow */
//         padding: 30px;
//         transition: transform 0.3s ease, box-shadow 0.3s ease;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         min-height: 420px; /* Slightly increased height for better visual spacing */
//         text-align: left; /* Align card content left */
//     }

//     .comparison-card:hover {
//         transform: translateY(-3px);
//         box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
//     }
    
//     .card-header {
//         margin-bottom: 25px;
//     }
    
//     /* --- BADGE STYLES (Clean Light Blue Look) --- */
//     .badge {
//         display: inline-block;
//         font-size: 0.85rem;
//         font-weight: 600;
//         padding: 4px 10px;
//         border-radius: 6px; /* Less rounded corners */
//         margin-bottom: 15px;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         background-color: #f0f8ff; /* Very light blue background */
//         color: #0b3d91; /* Dark blue text */
//         border: 1px solid #d0e7ff; /* Subtle border */
//     }
    
//     /* --- PRICE TAG STYLES --- */
//     .price-tag {
//         font-size: 2.2rem;
//         font-weight: 800;
//         color: #333; /* Dark price text */
//         margin: 0;
//         line-height: 1.1;
//     }

//     /* --- NEW Description Style --- */
//     .card-description {
//         font-size: 0.95rem;
//         color: #888;
//         margin-top: 5px;
//         margin-bottom: 0;
//         line-height: 1.4;
//     }
    
//     /* Feature List */
//     .feature-list {
//         list-style: none;
//         padding: 0;
//         margin-top: 15px;
//         margin-bottom: 30px;
//         flex-grow: 1;
//     }

//     .feature-list li {
//         font-size: 1rem;
//         color: #555;
//         padding: 8px 0;
//         display: flex;
//         align-items: flex-start; 
//         line-height: 1.5;
//         font-weight: 500;
//     }
    
//     /* Checkmark styling */
//     .check {
//         font-weight: 900;
//         color: #007bff; /* Primary blue checkmark */
//         margin-right: 10px;
//         font-size: 1rem;
//         line-height: 1.5; /* Align with text */
//         flex-shrink: 0; 
//     }
    
//     /* The bold feature label (e.g., **Access**) is part of the feature text, but we'll remove explicit strong tags here for the cleaner look */
//     .feature-list li span:nth-child(2) {
//         font-weight: 700;
//         margin-right: 5px; 
//     }

//     /* --- CTA BUTTON STYLES (Bright Blue as per image) --- */
//     .cta-button {
//         background-color: #007bff; /* Bright Primary Blue */
//         color: white;
//         border: none;
//         padding: 14px 25px;
//         border-radius: 8px;
//         font-size: 1rem;
//         font-weight: 600; 
//         cursor: pointer;
//         transition: background-color 0.3s, transform 0.1s;
//         width: 100%;
//         text-transform: uppercase;
//         letter-spacing: 0.5px;
//         box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
//     }

//     .cta-button:hover {
//         background-color: #0056b3;
//         transform: translateY(-1px);
//     }
    
//     /* Mobile Responsiveness */
//     @media (max-width: 768px) {
//         .value-comparison-section {
//             margin: 30px auto;
//         }
//         .value-comparison-section h2 {
//             font-size: 1.75rem;
//         }
//         .comparison-grid {
//             grid-template-columns: 1fr;
//         }
//         .comparison-card {
//             min-height: auto;
//         }
//     }
//     `;
//     const styleTag = document.createElement('style');
//     styleTag.type = 'text/css';
//     styleTag.appendChild(document.createTextNode(css));
//     document.head.appendChild(styleTag);
// };
import './ProgramValueComparison.css';
// --- Component Logic ---

const comparisonData = [
    { 
        type: "Online Course", 
        price: "Starting at 4999", 
        description: "Ideal for beginners who need flexible, self-paced access to foundational materials.", // Added description
        features: [
            { label: "Access", value: "3 Months" },
            { label: "Support", value: "Community Forums" },
            { label: "Key Feature", value: "Self-paced flexibility" },
        ]
    },
    { 
        type: "Live Classes", 
        price: "5999 / 3 Months", 
        description: "The perfect balance of structured learning, dedicated support, and ongoing practice.", // Added description
        features: [
            { label: "Access", value: "Full Year" },
            { label: "Support", value: "Live Q&A Sessions" },
            { label: "Key Feature", value: "Scheduled structure & interaction" },
        ]
    },
    { 
        type: "Classic Mentorship", 
        price: "9999 / 3 Months", 
        description: "The perfect balance of structured learning, dedicated support, and ongoing practice.", // Added description
        features: [
            { label: "Access", value: "Full Year" },
            { label: "Support", value: "Live Q&A Sessions" },
            { label: "Key Feature", value: "Scheduled structure & interaction" },
        ]
    },
    { 
        type: "Premium Mentorship", 
        price: "12999 / Year", 
        description: "Accelerate your career with personalized feedback and direct, unlimited 1:1 instructor time.", // Added description
        features: [
            { label: "Access", value: "Lifetime" },
            { label: "Support", value: "1:1 Instructor Chat" },
            { label: "Key Feature", value: "Personalized career guidance" },
        ]
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
                        <div className="card-content-top">
                            <div className="card-header">
                                <span className="badge">{item.type}</span> 
                                <h3 className="price-tag">{item.price}</h3>
                                <p className="card-description">{item.description}</p> {/* New Description */}
                            </div>
                            <ul className="feature-list">
                                {item.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <span className="check">✓</span> 
                                        <strong>{feature.label}:</strong> {feature.value}
                                    </li>
                                ))}
                            </ul>
                        </div>
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