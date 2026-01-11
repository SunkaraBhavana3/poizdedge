import React from 'react';
import './TrainingSection.css'; 

const TrainingSection = () => {
  return (
    <section className="training-section value-proposition">
      
      <div className="unique-value-header">
        <h2>🔥 The Poizdedge Institute Advantage: Why We're Different</h2>
        <p>Unlike other institutes, we don't just teach. We guarantee market readiness by integrating career support directly into your program.</p>
      </div>

      <div className="card-container">
        
        {/* 📚 Card 1: Core Technical Training */}
        <div className="training-card course-card">
          <h3 className="card-title">📚 3-Month Intensive Course Training</h3>
          <p className="card-description">
            We focus on deep technical expertise and hands-on projects across a 3-month intensive schedule, ensuring you master in-demand industry skills.
          </p>
          {/* NOTE: Buttons are removed here */}
        </div>
        
        {/* 🤝 Card 2: Integrated Job/Interview Training (The Unique Selling Point) */}
        <div className="training-card interview-card">
          <h3 className="card-title">🤝 Integrated Job Readiness Module</h3>
          <p className="card-description">
           Get personalized, friendly coaching to ace your interviews! This 10-day focused module unlocks in the final weeks, providing supportive mock interviews and resume help—your confidence booster, guaranteed.
          </p>
        
          {/* NOTE: Buttons are removed here */}
        </div>
      
      </div>
      
    </section>
  );
};

export default TrainingSection;