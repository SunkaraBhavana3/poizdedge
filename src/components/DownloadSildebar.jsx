// DownloadSildebar.jsx
import React from 'react';
import { Link } from "react-router-dom";   // 💙 IMPORTANT import
import './DownloadSildebar.css'; 

const DownloadSildebar = () => {
  const brochurePath = "/path/to/your/brochure.pdf";
  const handbookPath = "/path/to/your/handbook.pdf";

  const CalendarIcon = () => (
    <span className="card-icon" role="img" aria-label="calendar">
      📅
    </span>
  );

  const RegisterArrow = () => <span className="arrow">→</span>;

  return (
    <div className="download-section-container"> 
      <h3>⬇️ Download Your Resources: Brochure & Handbook ⬇️</h3>
      
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

        {/* --- Handbook Download Card ---
        <div className="download-register-card handbook-card">
          <CalendarIcon />
          
          <div className="card-content">
  <p className="card-title">
    <span className="title-bold">Brochure</span> | Full Course Catalog
  </p>

  <Link to="/brochure" className="register-button">
    Download Now <RegisterArrow />
  </Link>
</div>

        </div> */}

      </div> 
    </div>
  );
};

export default DownloadSildebar;
