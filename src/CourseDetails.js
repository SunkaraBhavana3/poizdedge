import React, { useState } from 'react';
import './CourseDetails.css'; // Import the dedicated CSS file

// --- DATA MOCKUP (Slightly enhanced for screenshot context) ---
const instructor = {
    name: "Dr. Alex Doe, Ph.D.",
    title: "Senior React Developer & Trainer",
    experience: "10+ years in Web Development, 5 years teaching React.",
    bio: "Dr. Doe specializes in scalable front-end architecture and is passionate about helping others master complex topics. She has worked with Fortune 500 companies and startups alike.",
    avatarUrl: "https://via.placeholder.com/120/583EFF/FFFFFF?text=AD" // Updated size/color to match
};

const courseDetails = {
    title: "Advanced Web Development Masterclass", // Matching screenshot title
    shortIntro: "Master modern web technologies with hands-on projects. Learn React, Node.js, TypeScript, and build production-ready applications from scratch.",
    price: "$89",
    originalPrice: "$199", // For the strikethrough effect
    duration: "42 hours",
    lessons: "128 Lessons",
    level: "Intermediate",
    rating: 4.8,
    reviewsCount: 2847,
    studentsCount: 15420,
    thumbnailUrl: "https://via.placeholder.com/400x250/583EFF/FFFFFF?text=Masterclass+Video"
};

const modulesData = [
    { id: 1, title: "Getting Started with Modern Web Development", duration: "2h 30m", completed: "5 completed", lessons: 5 },
    { id: 2, title: "React Fundamentals & Core Concepts", duration: "4h 15m", completed: "2 completed", lessons: 6 },
    { id: 3, title: "Advanced React Patterns", duration: "5h 45m", completed: "0 completed", lessons: 5 },
    { id: 4, title: "Backend Development with Node.js", duration: "6h 20m", completed: "0 completed", lessons: 5 },
    { id: 5, title: "Deployment and Final Project", duration: "3h 0m", completed: "0 completed", lessons: 4 }
];

const faqItems = [
    { id: 1, question: "Is this course suitable for beginners?", answer: "This course is designed for intermediate developers who have basic knowledge of HTML, CSS, and JavaScript. If you're completely new to programming, we recommend starting with our beginner courses first." },
    { id: 2, question: "How long do I have access to the course?", answer: "You get **lifetime access** to the course content, including all future updates and additions, from the moment you enroll." },
    { id: 3, question: "Are there any prerequisites for this course?", answer: "We assume you have basic familiarity with **HTML, CSS, and modern JavaScript (ES6+)**." }
];

const reviewSnippets = [
    { id: 1, text: "Fantastic course, worth every penny!" },
    { id: 2, text: "Clear explanations and great examples." }
];


// --- REACT COMPONENT ---
export default function CourseDetailsPage() {
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
                
                {/* 1. COURSE HEADER - MATCHING SCREENSHOT */}
                <section className="course-header-section">
                    <div className="course-badges">
                        <span className="badge badge-bestseller">Bestseller</span>
                        <span className="badge badge-level">{courseDetails.level}</span>
                    </div>

                    <h1 className="course-title">{courseDetails.title}</h1>
                    <p className="course-intro-text">{courseDetails.shortIntro}</p>
                    
                    <div className="course-meta-details">
                        <div className="course-rating">
                            <span className="star-icons">{'★'.repeat(Math.round(courseDetails.rating))}</span>
                            <span className="rating-count">{courseDetails.rating}</span>
                            <span className="reviews-count">({courseDetails.reviewsCount} reviews)</span>
                            <span className="students-count">| 🧑‍💻 {courseDetails.studentsCount} students</span>
                        </div>
                        
                        <div className="course-info-tags">
                            <span className="info-tag"><i className="fas fa-clock"></i> {courseDetails.duration}</span>
                            <span className="info-tag"><i className="fas fa-file-alt"></i> {courseDetails.lessons}</span>
                            <span className="info-tag"><i className="fas fa-award"></i> Certificate</span>
                        </div>

                        {/* Enroll Buttons (as shown in hero section) - NOTE: This matches the screenshot exactly */}
                        <div className="hero-enroll-buttons">
                            <span className="hero-price-display">
                                <span className="current-price">{courseDetails.price}</span>
                                <span className="original-price">{courseDetails.originalPrice}</span>
                            </span>
                            <button className="enroll-btn-hero">Enroll Now</button>
                            <button className="preview-btn-hero">▷ Preview</button>
                        </div>
                    </div>
                </section>
                
                {/* 2. INSTRUCTOR PROFILE - MATCHING SCREENSHOT */}
                <section className="instructor-section card">
                    <h4>LEARN FROM THE EXPERT</h4>
                    <h2 className="section-header">Dr. {instructor.name.split(' ')[1]} Mitchell</h2> {/* Adjusted to match screenshot name/style */}
                    <div className="instructor-card">
                        <img src={instructor.avatarUrl} alt="Instructor Profile" className="profile-img" />
                        <div className="profile-info">
                            <h3 className="instructor-name">{instructor.name}</h3>
                            <p className="instructor-title">Senior Software Engineer at Google</p> {/* Matching screenshot title */}
                            
                            <div className="instructor-stats">
                                <p className="stat"><i className="fas fa-user-graduate"></i> **45,000** Students</p>
                                <p className="stat"><i className="fas fa-book"></i> **12** Courses</p>
                                <p className="stat"><i className="fas fa-star"></i> **4.9** Rating</p>
                            </div>

                            <p className="instructor-bio">{instructor.bio}</p>
                            
                            {/* Skills Tags Placeholder */}
                            <div className="skill-tags">
                                <span className="skill-tag">React</span>
                                <span className="skill-tag">Node.js</span>
                                <span className="skill-tag">TypeScript</span>
                                <span className="skill-tag">System Design</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. COURSE CURRICULUM (MODULES) - MATCHING SCREENSHOT */}
                <section className="curriculum-section">
                    <h4>COURSE CONTENT</h4>
                    <h2 className="section-header">Course Modules</h2>
                    <div className="module-summary">4 Modules • 21 Lessons • **7/21 Completed**</div>
                    {modulesData.map((module) => {
                        const isExpanded = expandedModule === module.id;
                        return (
                            <div key={module.id} className="module-card">
                                {/* MODULE HEADER */}
                                <div className="module-header" onClick={() => toggleModule(module.id)}>
                                    {/* Module Numbering like 01, 02 */}
                                    <span className="status-icon">{`0${module.id}`}</span> 
                                    <div className="module-details">
                                        <h3 className="module-title">{module.title}</h3>
                                        <div className="module-meta">
                                            <span className="lesson-count">{module.lessons} lessons</span> 
                                            <span className="duration-count"><i className="fas fa-clock"></i> {module.duration}</span>
                                            <span className="completed-count"><i className="fas fa-check-circle"></i> {module.completed}</span>
                                        </div>
                                    </div>
                                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} expand-icon`}></i>
                                </div>

                                {/* MODULE CONTENT */}
                                {isExpanded && (
                                    <div className="module-content">
                                        <ul className="module-topic-list">
                                            {/* Topics were not in screenshot, using original structure but with matching style */}
                                            {["Video Lecture", "Hands-on Exercise", "Reading Material", "Quick Quiz"].map((topic, index) => (
                                                <li key={index} className="module-topic">
                                                    <i className="fas fa-file-alt"></i> {topic}
                                                </li>
                                            ))}
                                            <li className="module-topic quiz-topic">
                                                <i className="fas fa-question-circle"></i> **Module Quiz**
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>
                
                {/* 4. FINAL TEST & CERTIFICATE - MATCHING SCREENSHOT */}
                <section>
                    <h4>ACHIEVEMENT</h4>
                    <h2 className="section-header">Final Test & Certificate</h2>
                    <div className="final-assessment-section">
                        <div className="card assessment-card-left">
                            <i className="fas fa-file-invoice assessment-icon"></i>
                            <h3 className="assessment-title">Final Assessment</h3>
                            <p className="assessment-subtitle">Complete to earn your certificate</p>
                            
                            {/* Progress bar structure from screenshot */}
                            <div className="progress-bar-container">
                                <div className="progress-label">Course Progress</div>
                                <div className="progress-percent">65%</div>
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill" style={{ width: '65%' }}></div>
                                </div>
                            </div>

                            <p className="assessment-tip">Complete all modules to unlock the final test</p>

                            <div className="assessment-stats">
                                <div className="stat-box">
                                    <p className="stat-number">50</p>
                                    <p className="stat-label">Questions</p>
                                </div>
                                <div className="stat-box">
                                    <p className="stat-number">90 min</p>
                                    <p className="stat-label">Duration</p>
                                </div>
                            </div>
                            
                            <button className="final-test-btn disabled-btn">Complete Course First</button>
                        </div>

                        <div className="card certificate-card-right">
                            <div className="certificate-badge">
                                <i className="fas fa-ribbon"></i> {/* Matching icon from screenshot */}
                            </div>
                            <h3 className="certificate-title">Certificate of Completion</h3>
                            <div className="certificate-mockup">
                                <p className="certifies-text">THIS CERTIFIES THAT</p>
                                <h4 className="certified-name">[Your Name]</h4>
                                <p className="completed-text">has successfully completed</p>
                                <p className="course-name">{courseDetails.title}</p>
                            </div>
                            <p className="final-test-req">Pass the final test with 70% or higher to earn your certificate</p>
                            <button className="unlock-btn">
                                <i className="fas fa-lock-open"></i> Unlock Your Achievement
                            </button>
                        </div>
                    </div>
                </section>

                {/* 5. FAQ SECTION - MATCHING SCREENSHOT */}
                <section className="faq-section">
                    <h2 className="section-header">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqItems.map((item) => {
                            const isExpanded = activeFAQ === item.id;
                            return (
                                <div key={item.id} className="faq-item">
                                    <div 
                                        className={`faq-question ${isExpanded ? 'active' : ''}`} 
                                        onClick={() => toggleFAQ(item.id)}
                                    >
                                        <i className="fas fa-question-circle faq-question-icon"></i>
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

                {/* 6. REVIEWS SECTION - MATCHING SCREENSHOT (Write a Review) */}
                <section className="reviews-section">
                    <h4>SHARE YOUR EXPERIENCE</h4>
                    <h2 className="section-header">Write a Review</h2>
                    <div className="card review-input-card">
                        <p>How would you rate this course?</p>
                        <div className="rating-stars-input">☆☆☆☆☆</div>
                        <textarea placeholder="Share your thoughts about this course..." rows="4"></textarea>
                        <button className="submit-review-btn">Submit Review</button>
                    </div>

                    <h3 className="recent-reviews-header">Recent Reviews (3)</h3>
                    {/* Placeholder for individual review cards (similar to screenshot 194243.png) */}
                    {reviewSnippets.map(review => (
                        <div key={review.id} className="card single-review-card">
                            <div className="reviewer-info">
                                <img src={`https://via.placeholder.com/50/583EFF/FFFFFF?text=S${review.id}`} alt="Reviewer Avatar" className="reviewer-avatar" />
                                <div className="reviewer-details">
                                    <p className="reviewer-name">Student {review.id}</p>
                                    <p className="review-date">{review.id} day(s) ago</p>
                                </div>
                            </div>
                            <div className="review-text-content">
                                <span className="star-icons">★★★★★</span>
                                <p>{review.text}</p>
                                <div className="review-actions">
                                    <span className="like-count"><i className="far fa-thumbs-up"></i> 24</span>
                                    <span className="reply-count"><i className="far fa-comment"></i> 5 replies</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
                
            </div> {/* End main-content */}
            
            {/* 7. STICKY SIDEBAR (ENROLLMENT CARD) - NOTE: This will only be sticky with the correct CSS */}
            <aside className="sticky-sidebar">
                <div className="enrollment-card">
                    {/* Placeholder for the video preview section with gradient overlay */}
                    <div className="video-preview-placeholder">
                         <img src={courseDetails.thumbnailUrl} alt="Course Thumbnail" className="course-thumbnail" />
                         <div className="video-play-button">
                             <i className="fas fa-play"></i>
                         </div>
                    </div>

                    <div className="enroll-card-body">
                        {/* The screenshot shows price in the hero, but we keep the sidebar price as is common */}
                        <p className="price-label">Includes:</p> 
                        <ul className="include-list">
                            <li><i className="fas fa-video"></i> {courseDetails.duration} of Video Content</li>
                            <li><i className="fas fa-file-download"></i> Downloadable Resources</li>
                            <li><i className="fas fa-certificate"></i> Certificate of Completion</li>
                            <li><i className="fas fa-life-ring"></i> Instructor Support</li>
                        </ul>
                        
                        <button className="enroll-btn full-width-cta">
                            Buy Now for {courseDetails.price}
                        </button>

                        <p className="guarantee-text">30-Day Money-Back Guarantee</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}