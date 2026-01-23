// DownloadSildebar.jsx
import React from 'react';
import { Link } from "react-router-dom"; 
import './DownloadSildebar.css'; 
import Handbook from "../assets/Handbook.pdf";
const DownloadSildebar = () => {
  const CalendarIcon = () => (
    <span className="card-icon" role="img" aria-label="calendar">
      📅
    </span>
  );

  const HandbookIcon = () => (
    <span className="card-icon" role="img" aria-label="handbook">
      📖
    </span>
  );

  const RegisterArrow = () => <span className="arrow">→</span>;

  return (
    <div className="download-section-container"> 
      <h3>⬇️ Download Your Resources ⬇️</h3>
      
      <div className="download-cards-wrapper"> 
        
        {/* --- Brochure Download Card --- */}
        <div className="download-register-card brochure-card">
          <CalendarIcon />
          <div className="card-content">
            <p className="card-title">
              <span className="title-bold">Brochure</span> | Full Course Catalog
            </p>
            {/* Go to BrochureAccess page */}
            <Link to="/brochure" className="register-button">
              Download Now <RegisterArrow />
            </Link>
          </div>
        </div>

        {/* --- Handbook Download Card --- */}
        <div className="download-register-card handbook-card">
          <HandbookIcon />
          <div className="card-content">
            <p className="card-title">
              <span className="title-bold">Handbook</span> | Student Guidelines
            </p>
            {/* Go to Handbook page */}
            <Link to={Handbook} className="register-button">
              Download Now <RegisterArrow />
            </Link>
          </div>
        </div>

      </div> 
    </div>
  );
};

export default DownloadSildebar;
