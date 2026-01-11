import React, { useState } from 'react';
import './Coursedetail1.css'; // Updated CSS import

// --- DATA MOCKUP ---
const instructor = {
  name: "Dr. Alex Doe, Ph.D.",
  title: "Senior React Developer & Trainer",
  experience: "10+ years in Web Development, 5 years teaching React.",
  bio: "Dr. Doe specializes in scalable front-end architecture and is passionate about helping others master complex topics.",
  avatarUrl: "https://via.placeholder.com/100/1A237E/FFFFFF?text=AD" 
};

const courseDetails = {
  title: "Mastering React Hooks: From Beginner to Pro",
  shortIntro: "Learn the fundamentals and advanced techniques of modern React development using Hooks, Context, and performance optimization.",
  price: "$99.99",
  duration: "10 Hours",
  level: "Intermediate",
  rating: 4.8,
  reviewsCount: 154,
  thumbnailUrl: "https://via.placeholder.com/300x200/448AFF/FFFFFF?text=React+Hooks"
};

const modulesData = [
  { id: 1, title: "Module 1: Introduction to Hooks", topics: ["Course Overview", "What are Hooks?", "Setup and Tooling"], hasQuiz: true },
  { id: 2, title: "Module 2: The State Hook (useState)", topics: ["Understanding Component State", "Basic useState Syntax", "Best Practices"], hasQuiz: true },
  { id: 3, title: "Module 3: The Effect Hook (useEffect)", topics: ["Side Effects in React", "Cleanup Function", "Dependency Array Mastery"], hasQuiz: true },
  { id: 4, title: "Module 4: Context and Reducers", topics: ["Context API Deep Dive", "useReducer for Complex State", "Global State Management"], hasQuiz: true },
  { id: 5, title: "Module 5: Performance Hooks", topics: ["useCallback and useMemo", "Referential Equality", "Custom Hook Creation"], hasQuiz: true },
  { id: 6, title: "Module 6: Advanced Patterns", topics: ["Data Fetching Patterns", "Testing Hooks", "Real-world Project Implementation"], hasQuiz: true }
];

const faqItems = [
  { id: 1, question: "How long do I have access to the course?", answer: "You get **lifetime access** to the course content, including all future updates and additions, from the moment you enroll." },
  { id: 2, question: "What prior knowledge is required?", answer: "We assume you have basic familiarity with **HTML, CSS, and modern JavaScript (ES6+)**." },
  { id: 3, question: "Is there a money-back guarantee?", answer: "Yes! We offer a **30-day, no-questions-asked refund policy**." }
];

// --- REACT COMPONENT ---
export default function Coursedetail1() { // Updated component name
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleModule = (id) => {
    setExpandedModule(expandedModule === id ? null : id);
  };
  
  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <div className="course-page-container">
      <div className="main-content">
        
        {/* COURSE HEADER */}
        <section className="course-header-section">
          <h1 className="course-title">{courseDetails.title}</h1>
          <p className="course-intro-text">{courseDetails.shortIntro}</p>
          <div className="course-rating">
            <span className="star-icons">{'★'.repeat(Math.round(courseDetails.rating))}</span>
            <span className="rating-count">
              {courseDetails.rating}/5.0 ({courseDetails.reviewsCount} Reviews)
            </span>
          </div>
        </section>
        <hr className="divider" />
        
        {/* INSTRUCTOR PROFILE & EXPERIENCE CARD */}
        <section className="instructor-section card">
          <h2 className="section-header">👤 Your Instructor</h2>
          <div className="instructor-card">
            <img src={instructor.avatarUrl} alt="Instructor Profile" className="profile-img" />
            <div className="profile-info">
              <h3 className="instructor-name">{instructor.name}</h3>
              <p className="instructor-title">{instructor.title}</p>
              <p className="instructor-exp">**Experience:** {instructor.experience}</p>
              <p className="instructor-bio">{instructor.bio}</p>
            </div>
          </div>
        </section>

        {/* COURSE CURRICULUM (MODULES) */}
        <section className="curriculum-section">
          <h2 className="section-header">📚 Course Curriculum ({modulesData.length} Modules)</h2>
          {modulesData.map((module) => {
            const isExpanded = expandedModule === module.id;
            return (
              <div key={module.id} className="module-card">
                {/* MODULE HEADER */}
                <div className="module-header" onClick={() => toggleModule(module.id)}>
                  <span className="status-icon"><i className="fas fa-play-circle"></i></span>
                  <h3 className="module-title">{module.title}</h3>
                  <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} expand-icon`}></i>
                </div>

                {/* MODULE CONTENT */}
                {isExpanded && (
                  <div className="module-content">
                    <ul className="module-topic-list">
                      {module.topics.map((topic, index) => (
                        <li key={index} className="module-topic">
                          <i className="fas fa-file-alt"></i> {topic}
                        </li>
                      ))}
                      {module.hasQuiz && (
                        <li className="module-topic quiz-topic">
                          <i className="fas fa-question-circle"></i> **Module Quiz**
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </section>
        
        {/* FINAL TEST & CERTIFICATE */}
        <section className="final-assessment-section card assessment-card-border">
          <h2 className="section-header">🏆 Final Test & Certification</h2>
          <div className="assessment-card-content">
            <div className="certificate-badge">
              <i className="fas fa-award"></i>
            </div>
            <p>
              Complete all modules and quizzes, then pass the **Final Test** (80% score required).
            </p>
            <button className="final-test-btn">
              Unlock Certificate
            </button>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="reviews-section card">
          <h2 className="section-header">💬 Student Reviews & Rating</h2>
          <div className="overall-rating-display">
            <span className="rating-score">{courseDetails.rating}/5.0</span>
            <div className="star-icons big-stars">{'★'.repeat(Math.round(courseDetails.rating))}</div>
            <p className="rating-based-on">Based on {courseDetails.reviewsCount} Ratings</p>
          </div>
          {/* Placeholder for Review/Comment Cards */}
          <div className="review-card-placeholder">
            **Student A:** "Fantastic course, worth every penny!" <span className="star-icons">★★★★★</span>
          </div>
          <div className="review-card-placeholder">
            **Student B:** "Clear explanations and great examples." <span className="star-icons">★★★★☆</span>
          </div>
        </section>
        
        {/* FAQ SECTION (Accordion) */}
        <section className="faq-section card">
          <h2 className="section-header">❓ Frequently Asked Questions (FAQ)</h2>
          <div className="faq-list">
            {faqItems.map((item) => {
              const isExpanded = activeFAQ === item.id;
              return (
                <div key={item.id} className="faq-item">
                  <div 
                    className={`faq-question ${isExpanded ? 'active' : ''}`} 
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <p className="faq-question-text">{item.question}</p>
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} faq-icon`}></i>
                  </div>
                  
                  {isExpanded && (
                    <div className="faq-answer">
                      <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        
      </div> {/* End main-content */}
      
      {/* STICKY SIDEBAR (ENROLLMENT CARD) */}
      <aside className="sticky-sidebar">
        <div className="enrollment-card">
          <img src={courseDetails.thumbnailUrl} alt="Course Thumbnail" className="course-thumbnail" />
          <div className="enroll-card-body">
            <p className="price-label">Course Price</p>
            <h3 className="course-price">{courseDetails.price}</h3>
            
            <div className="course-detail-grid">
              <span><i className="fas fa-clock"></i> {courseDetails.duration}</span>
              <span><i className="fas fa-chart-line"></i> {courseDetails.level}</span>
            </div>
            
            <button className="enroll-btn">
              <i className="fas fa-play-circle"></i> Enroll Now
            </button>
            <p className="guarantee-text">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </aside>
    </div>
  );
}