import React, { useState, useRef, useEffect } from "react";

// ================================================================= //
// DATA DEFINITION: Centralized Data for Easy Updates
// ================================================================= //

const courseData = {
    title: "Clinical Research ",
    rating: 4.8,
    enrollments: "1,250",
    price: "$499.00",
    description: "Welcome to **The Poizdedge Institute's** comprehensive training program. This course is meticulously designed for healthcare professionals and researchers aiming for clinical excellence. Gain in-depth knowledge and practical skills across all phases of clinical research, from ethical considerations to advanced data management.",
    instructorName: "Dr. Evelyn Reed, PhD, CCRP",
    instructorTitle: "Lead Clinical Research Scientist | 15 Years Experience",
    instructorAvatar: "https://i.pravatar.cc/150?img=49",
    // PROFESSIONAL BRAND COLOR (Deep professional blue/teal)
    brandColor: "#0077b6", 
};

const learningOutcomes = [
    "Mastering Good Clinical Practice (GCP) principles.",
    "Designing robust clinical study protocols.",
    "Ensuring ethical compliance in patient recruitment.",
    "Understanding regulatory submission requirements.",
];

const modulesData = [
    {
        id: 1,
        title: "Module 1: Foundation of Clinical Research &amp; Drug Development",
        lessons: [
            { id: 101, title: "Welcome & Course Overview (FREE PREVIEW)", duration: "10 min", type: "Video" },
            { id: 102, title: "Ethics in Clinical Trials (GCP)", duration: "25 min", type: "Reading" },
            { id: 103, title: "Introduction Quiz", duration: "15 min", type: "Quiz" },
        ],
    },
    {
        id: 2,
        title: "Module 2: Clinical Operations and Site Management",
        lessons: [
            { id: 201, title: "Investigator Responsibilities", duration: "20 min", type: "Video" },
            { id: 202, title: "Informed Consent Process", duration: "30 min", type: "Video" },
            { id: 203, title: "GCP Compliance Assignment", duration: "1 hour", type: "Assignment" },
        ],
    },
    {
        id: 3,
        title: "Module 3:Clinical Data Management, EDC &amp; Pharmacovigilance",
        lessons: [
            { id: 301, title: "Types of Clinical Study Designs", duration: "40 min", type: "Video" },
            { id: 302, title: "Protocol Drafting Workshop", duration: "1 hour 30 min", type: "Assignment" },
        ],
    },
     {
        id: 4,
        title: "Module 4: Regulatory Affairs, Emerging Technologies & Career Building",
        lessons: [
            { id: 401, title: "Regulatory Submission Overview", duration: "10 min", type: "Video" },
            { id: 402, title: "AI in Clinical Trials", duration: "25 min", type: "Reading" },
            { id: 403, title: "Career Path Planning Quiz", duration: "15 min", type: "Quiz" },
        ],
    },
     {
        id: 5,
        title: "Module 5: CV building &amp; Self understanding",
        lessons: [
            { id: 501, title: "Effective CV Structure", duration: "10 min", type: "Video" },
            { id: 502, title: "Highlighting Research Experience", duration: "25 min", type: "Reading" },
            { id: 503, title: "Self-Assessment Quiz", duration: "15 min", type: "Quiz" },
        ],
    }, {
        id: 6,
        title: "Module 6: Interview Readiness",
        lessons: [
            { id: 601, title: "Common Interview Questions", duration: "10 min", type: "Video" },
            { id: 602, title: "Mock Interview Scenarios", duration: "25 min", type: "Reading" },
            { id: 603, title: "Final Readiness Quiz", duration: "15 min", type: "Quiz" },
        ],
    },
];

// NEW DATA: Assessments
const assessmentData = [
    { id: 1, title: "Module 1 Knowledge Check", type: "Quiz", due: "Immediate", status: "Not Started", icon: "❓" },
    { id: 2, title: "Protocol Drafting Assignment", type: "Assignment", due: "Week 3, Oct 25", status: "In Progress", icon: "📝" },
    { id: 3, title: "GCP Midterm Exam", type: "Test", due: "Week 5, Nov 8", status: "Locked", icon: "🧠" },
];

// NEW DATA: Announcements
const announcementData = [
    { id: 1, date: "Oct 19, 2025", title: "Live Q&A Session Rescheduled", content: "Due to a scheduling conflict, the live session is moved to next Friday at 10:00 AM IST. Please check the 'Live Sessions' tab for the new link." },
    { id: 2, date: "Oct 15, 2025", title: "New Reading Materials Posted", content: "Module 2 supplemental reading on 'Adverse Event Reporting' is now available in the resources section. This is recommended, but not required." },
];


const testimonialsData = [
    { id: 1, text: "The GCP modules were incredibly detailed and immediately applicable to my work. A huge career booster!", rating: 5, student: "Anya Sharma" },
    { id: 2, text: "Excellent instructor and well-paced content. The assignment feedback was professional and insightful.", rating: 5, student: "Mark O'Connell" },
    { id: 3, text: "Loved the breakdown of complex study designs. Highly recommend this for any research professional.", rating: 4, student: "Dr. Chen Liu" },
];

const faqData = [
    { id: 1, question: "What are the prerequisites for this course?", answer: "A basic understanding of medical or biological terminology is recommended, but no prior clinical research experience is strictly required." },
    { id: 2, question: "Is the certification accredited?", answer: "Yes, the certification is recognized by leading professional bodies in clinical research (e.g., ACRP, SoCRA) and is widely accepted globally." },
    { id: 3, question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee if you have completed less than 20% of the course content." },
];

// ================================================================= //
// HELPER COMPONENTS & LOGIC 
// ================================================================= //

const renderStars = (rating) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<span key={i} style={{ color: i <= rating ? '#ffc107' : '#e4e5e9', fontSize: '1.2rem', marginRight: '2px' }}>{fullStar}</span>);
    }
    return stars;
};

const getLessonIcon = (type) => {
    switch(type) {
        case 'Video': return <span style={{color: '#dc3545'}}>▶</span>;
        case 'Reading': return <span style={{color: '#ffc107'}}>📖</span>;
        case 'Quiz': return <span style={{color: '#007bff'}}>❓</span>;
        case 'Assignment': return <span style={{color: '#28a745'}}>📝</span>;
        default: return <span>📚</span>;
    }
};

const FAQSection = () => {
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-section">
            <h2>❓ Frequently Asked Questions</h2>
            {faqData.map(item => (
                <div key={item.id} className="faq-item-card">
                    <div 
                        className="faq-question-header" 
                        onClick={() => toggleFAQ(item.id)}
                        aria-expanded={openId === item.id}
                        role="button"
                        tabIndex="0"
                    >
                        **{item.question}**
                        <span className="faq-toggle-icon">{openId === item.id ? '−' : '+'}</span>
                    </div>
                    <div 
                        className={`faq-answer-content ${openId === item.id ? 'active' : ''}`}
                        style={{
                            maxHeight: openId === item.id ? '200px' : '0',
                            paddingTop: openId === item.id ? '15px' : '0',
                        }}
                    >
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};


// ================================================================= //
// STYLES DEFINITION: All CSS Consolidated
// ================================================================= //

const customStyles = `
    /* Global Reset and Background */
    body {
        margin: 0;
        background-color: #f7f9fc;
        color: #333333; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Main Layout */
    .course-page-container {
        max-width: 1200px; 
        margin: 50px auto;
        padding: 0 25px;
        box-sizing: border-box;
    }

    /* Headings & Separators */
    .course-page-container h2 {
        font-size: 2.2rem;
        color: ${courseData.brandColor};
        margin-bottom: 30px;
        padding-bottom: 10px;
        border-bottom: 2px solid rgba(0, 123, 255, 0.1);
    }
    
    /* Progress Bar */
    .progress-container {
        width: 100%;
        height: 30px;
        background-color: #e9ecef;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 40px;
    }
    .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #28a745, #17a2b8); 
        color: #fff;
        display: flex;
        align-items: center;
        padding-left: 15px;
        font-weight: 600;
        transition: width 0.5s ease-out;
        min-width: 150px; 
    }

    /* Course Header */
    .course-header {
        display: flex;
        flex-wrap: wrap;
        gap: 35px;
        margin-bottom: 50px;
        align-items: center; 
    }
    .course-header-info {
        flex: 1 1 450px;
        min-width: 300px;
    }
    .course-header-info h1 {
        font-size: 2.8rem; 
        color: ${courseData.brandColor}; 
        margin-bottom: 10px;
        line-height: 1.2;
    }
    .course-meta {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    .enrollment-count {
        font-size: 1rem;
        color: #555;
        font-weight: 500;
    }
    .course-header-image {
        flex: 1 1 450px; 
        min-width: 300px;
        position: relative;
        transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        cursor: pointer; 
    }
    .course-header-image:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.15); 
    }
    .course-header-image img {
        width: 100%;
        border-radius: 18px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.1); 
        object-fit: cover;
        height: 300px; 
    }

    /* Pricing & Buttons */
    .pricing-actions {
        display: flex;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap; 
        margin-top: 25px;
    }
    .course-price {
        font-size: 2.5rem;
        font-weight: bold;
        color: #00bfff; 
    }
    .action-button {
        padding: 14px 30px;
        font-size: 17px;
        font-weight: 600;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(0,0,0,0.1); 
        transition: transform 0.2s ease-out, box-shadow 0.2s ease-out, background 0.2s ease;
        user-select: none;
    }
    .action-button:hover {
        transform: translateY(-2px);
    }
    .add-to-cart-btn {
        background: linear-gradient(90deg, ${courseData.brandColor}, #00bfff); 
        color: #fff;
    }
    .source-code-btn {
        background: #333; 
        color: #fff;
        padding: 10px 20px;
        font-size: 0.95rem;
        text-decoration: none;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        margin-top: 15px; 
    }
    .source-code-btn:hover {
        background: #000;
    }

    /* Instructor Card */
    .instructor-card {
        margin: 50px 0;
        padding: 30px;
        display: flex;
        align-items: center;
        gap: 25px;
        background-color: #e6f7ff; 
        border-radius: 15px;
        border-left: 5px solid ${courseData.brandColor}; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .instructor-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%; 
        object-fit: cover;
        border: 4px solid ${courseData.brandColor};
        flex-shrink: 0; 
    }
    .instructor-info {
        text-align: left; 
    }
    .instructor-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${courseData.brandColor};
        margin-bottom: 5px;
    }
    .instructor-title {
        font-size: 1.1rem;
        color: #555;
    }

    /* What You'll Learn Section */
    .learn-section {
        margin-top: 50px;
        margin-bottom: 50px;
        background: #ffffff;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        border: 1px solid #e0e0e0; 
    }
    .learn-section h2 {
        color: #28a745;
        border-bottom: 2px solid rgba(40, 167, 69, 0.1);
    }
    .learn-list {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .learn-list li {
        background: #e9f7ff;
        color: ${courseData.brandColor};
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: 500;
        border: 1px solid #dff0ff;
    }
    
    /* Course Metrics (Developer Highlights) */
    .course-metrics {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: 40px 0;
        padding: 20px;
        background: #f0f8ff; 
        border-radius: 12px;
        border: 1px solid #d0e8ff;
    }
    .metric-icon {
        font-size: 2.2rem;
        color: #00bfff;
        margin-bottom: 5px;
    }

    /* Modules (Curriculum) */
    .module-card {
        margin-bottom: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        background: #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .module-header {
        padding: 18px 25px;
        font-size: 1.2rem;
        font-weight: 600;
        background-color: #f8f9fa;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.2s ease;
    }
    .module-header:hover {
        background-color: #f1f1f1;
    }
    .module-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease-out; 
    }
    .lesson-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .lesson-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 25px;
        border-top: 1px dashed #eee;
        font-size: 1rem;
        transition: background-color 0.1s;
    }
    .lesson-item:hover {
        background-color: #fcfcfc;
    }
    .lesson-toggle-button {
        cursor: pointer;
        font-size: 1.1rem;
        margin-right: 15px;
        user-select: none;
    }
    .lesson-toggle-button.completed {
        color: #28a745; 
    }
    .lesson-toggle-button.incomplete {
        color: #ccc; 
    }
    .module-progress-text {
        font-size: 0.9rem;
        font-weight: 500;
        margin-left: 15px;
        color: #28a745;
        border: 1px solid #28a745;
        padding: 2px 8px;
        border-radius: 5px;
        background-color: #e6ffe6;
    }

    /* NEW STYLES: Assessments & Announcements */
    .assessment-table, .announcement-item {
        margin-bottom: 30px;
        background: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .assessment-table table {
        width: 100%;
        border-collapse: collapse;
    }
    .assessment-table th, .assessment-table td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
    }
    .assessment-table th {
        background-color: #f1f7fe;
        color: ${courseData.brandColor};
        font-weight: 600;
        border-top: 2px solid ${courseData.brandColor};
    }
    .assessment-table tr:hover {
        background-color: #f9f9f9;
    }
    .status-badge {
        padding: 4px 10px;
        border-radius: 5px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    .status-badge.not-started { background-color: #ffedd5; color: #9a3412; }
    .status-badge.in-progress { background-color: #fef3c7; color: #a16207; }
    .status-badge.locked { background-color: #e5e7eb; color: #4b5563; }

    .announcement-item {
        border-left: 4px solid #f97316; /* Orange accent for announcements */
        padding: 15px 20px;
    }
    .announcement-item h4 {
        margin: 0;
        color: #f97316;
        font-size: 1.3rem;
        margin-bottom: 5px;
    }
    .announcement-item small {
        display: block;
        color: #999;
        margin-bottom: 10px;
        font-weight: 500;
    }
    .announcement-item p {
        margin: 0;
        color: #555;
        line-height: 1.5;
    }

    /* Testimonials */
    .testimonials-section {
        margin-top: 60px;
        margin-bottom: 60px;
    }
    .testimonial-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 25px;
    }
    .testimonial-card {
        background: #ffffff;
        padding: 25px;
        border-radius: 15px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        transition: transform 0.2s ease;
    }
    .testimonial-text {
        font-style: italic;
        color: #555;
        margin-bottom: 15px;
        font-size: 1.05rem;
    }

    /* FAQ Section */
    .faq-section {
        margin-top: 60px;
        margin-bottom: 60px;
    }
    .faq-item-card {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        margin-bottom: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        overflow: hidden; 
    }
    .faq-question-header {
        padding: 18px 25px;
        font-size: 1.1rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f8f9fa;
        transition: background-color 0.2s ease;
    }
    .faq-answer-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease-out, padding-top 0.4s ease-out;
    }
    .faq-answer-content p {
        margin: 0;
        color: #555;
        line-height: 1.6;
    }
    
    /* About Section */
    .about-section {
        margin-top: 50px;
        padding: 30px;
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }
    .about-section h2 {
        color: ${courseData.brandColor};
        border-bottom: none;
        padding-bottom: 0;
    }
    .about-section p {
        line-height: 1.6;
        color: #555;
    }

    /* Mobile CTA Bar */
    .fixed-cta-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(5px);
        box-shadow: 0 -4px 15px rgba(0,0,0,0.15);
        padding: 15px 25px;
        z-index: 1000;
        display: none; 
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e0e0e0;
    }
    .cta-price-mobile {
        font-size: 1.8rem;
        font-weight: bold;
        color: #00bfff;
    }
    .cta-button-mobile {
        background: linear-gradient(90deg, ${courseData.brandColor}, #00bfff); 
        color: #fff;
        padding: 12px 25px;
        font-size: 16px;
    }
    
    @media (max-width: 992px) {
        .fixed-cta-bar {
            display: flex; 
        }
    }
`;

// ================================================================= //
// MAIN COMPONENT: ClinicalResearchPage
// ================================================================= //

const ClinicalResearchPage = () => {
    const [activeModules, setActiveModules] = useState([]);
    const [completedLessons, setCompletedLessons] = useState({});
    const [courseProgress, setCourseProgress] = useState(0);
    const contentRefs = useRef({}); 

    // Calculate progress
    useEffect(() => {
        const totalLessons = modulesData.reduce((sum, mod) => sum + mod.lessons.length, 0);
        const completedCount = Object.values(completedLessons).filter(Boolean).length;
        const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        setCourseProgress(progress);
    }, [completedLessons]);

    const toggleModule = (id) => {
        setActiveModules((prevActiveModules) => {
            if (prevActiveModules.includes(id)) {
                return prevActiveModules.filter((modId) => modId !== id);
            } else {
                return [...prevActiveModules, id];
            }
        });
    };

    const toggleLesson = (lessonId) => {
        setCompletedLessons((prev) => ({
            ...prev,
            [lessonId]: !prev[lessonId],
        }));
    };

    const isModuleActive = (id) => activeModules.includes(id);

    // This useEffect ensures the accordion works correctly after state updates
    useEffect(() => {
        // This is a minimal hook to re-evaluate the height on render
    }, [activeModules]);


    return (
        <div className="course-page-container">
            {/* Inject Styles */}
            <style>{customStyles}</style>

            {/* Progress Bar (Gamification Feature) */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${courseProgress}%` }}>
                    {courseProgress > 5 ? `Course Progress: ${courseProgress}% Completed` : 'Start Your Journey!'}
                </div>
            </div>
            
            {/* 1. Course Header (Value Proposition) */}
            <div className="course-header">
                <div className="course-header-info">
                    <h1>{courseData.title}</h1>
                    
                    {/* Rating and Enrollment Count (Social Proof) */}
                    <div className="course-meta">
                        <div className="star-rating">
                            {renderStars(courseData.rating)} 
                        </div>
                        <span className="enrollment-count">| **{courseData.rating}** ({courseData.enrollments} Students Enrolled)</span>
                    </div>
                    
                    <p>{courseData.description}</p>
                    
                    {/* CTA and Pricing */}
                    <div className="pricing-actions">
                        <span className="course-price">{courseData.price}</span>
                        <button className="action-button add-to-cart-btn">
                            Enroll Now
                        </button>
                        <button className="action-button buy-now-btn">
                            Ask a Question
                        </button>
                    </div>
                </div>
                <div className="course-header-image">
                    <img
                        src="https://images.unsplash.com/photo-1549497555-520ac5169a71?q=80&w=2070&auto=format&fit=crop"
                        alt="Clinical Excellence Banner"
                    />
                </div>
            </div>
            
            <hr />

            {/* Instructor Profile */}
            <div className="instructor-card">
                <img
                    className="instructor-avatar"
                    src={courseData.instructorAvatar}
                    alt="Instructor Profile"
                />
                <div className="instructor-info">
                    <div className="instructor-name">{courseData.instructorName}</div>
                    <div className="instructor-title">{courseData.instructorTitle}</div>
                </div>
            </div>

            <hr />

            {/* 5. Course Announcements (NEW SECTION) */}
            <div className="announcements-section">
                <h2>📢 Important Course Announcements</h2>
                {announcementData.map(announcement => (
                    <div key={announcement.id} className="announcement-item">
                        <h4>{announcement.title}</h4>
                        <small>{announcement.date}</small>
                        <p>{announcement.content}</p>
                    </div>
                ))}
            </div>

            <hr />

            {/* 6. Assessments (NEW SECTION) */}
            <div className="assessments-section">
                <h2>📝 Tests, Assignments & Quizzes</h2>
                <div className="assessment-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Assessment</th>
                                <th>Type</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assessmentData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.icon} {item.title}</td>
                                    <td>**{item.type}**</td>
                                    <td>{item.due}</td>
                                    <td>
                                        <span className={`status-badge ${item.status.toLowerCase().replace(' ', '-')}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <hr />

            {/* 2. What You'll Learn (Clear Outcomes) */}
            <div className="learn-section">
                <h2>🎯 Key Outcomes</h2>
                <ul className="learn-list">
                    {learningOutcomes.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            <hr />

            {/* 3. Course Metrics (Developer & Student Highlights) */}
            <div className="course-metrics">
                <div className="metric-item">
                    <div className="metric-icon">⏱️</div>
                    <div className="metric-value">20 Hours</div>
                    <div className="metric-label">Total Content</div>
                </div>
                <div className="metric-item">
                    <div className="metric-icon">💻</div>
                    <div className="metric-value">React/Modern CSS</div>
                    <div className="metric-label">Tech Stack Highlight</div>
                </div>
                <div className="metric-item">
                    <div className="metric-icon">💡</div>
                    <div className="metric-value">Interactive Code</div>
                    <div className="metric-label">For Developers</div>
                </div>
                <div className="metric-item">
                    <div className="metric-icon">📄</div>
                    <div className="metric-value">Certification</div>
                    <div className="metric-label">Upon Completion</div>
                </div>
            </div>
            
            <hr />

            {/* 4. Course Modules (Curriculum) - Functional */}
            <div className="modules-section">
                <h2>Curriculum & Modules</h2>
                {modulesData.map((module) => {
                    const moduleLessons = module.lessons.map(l => l.id);
                    const completedInModule = moduleLessons.filter(id => completedLessons[id]).length;
                    const isModuleComplete = moduleLessons.length > 0 && completedInModule === moduleLessons.length;
                    
                    return (
                        <div
                            key={module.id}
                            className="module-card"
                        >
                            <div
                                className={`module-header ${isModuleActive(module.id) ? "active" : ""}`}
                                onClick={() => toggleModule(module.id)}
                            >
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {module.title}
                                    {isModuleComplete && (
                                        <span className="module-progress-text">
                                            🎉 Completed
                                        </span>
                                    )}
                                </div>
                                <span className="arrow">{isModuleActive(module.id) ? '▲' : '▼'}</span>
                            </div>

                            <div
                                ref={(el) => (contentRefs.current[module.id] = el)}
                                className="module-content"
                                style={{
                                    // Dynamically set maxHeight for smooth CSS transition
                                    maxHeight: isModuleActive(module.id) 
                                        ? `${contentRefs.current[module.id]?.scrollHeight || 500}px` 
                                        : '0px',
                                }}
                            >
                                <ul className="lesson-list">
                                    {module.lessons.map((lesson) => (
                                        <li key={lesson.id} className="lesson-item">
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <span 
                                                    className={`lesson-toggle-button ${completedLessons[lesson.id] ? 'completed' : 'incomplete'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLesson(lesson.id);
                                                    }}
                                                >
                                                    {completedLessons[lesson.id] ? '✔' : '○'}
                                                </span>
                                                {getLessonIcon(lesson.type)}
                                                <span style={{marginLeft: '10px', color: completedLessons[lesson.id] ? '#999' : '#333', textDecoration: completedLessons[lesson.id] ? 'line-through' : 'none'}}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            <small style={{color: '#777'}}>({lesson.duration})</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <hr />

            {/* 7. Testimonials (Social Proof) */}
            <div className="testimonials-section">
                <h2>⭐️ Student Success Stories</h2>
                <div className="testimonial-grid">
                    {testimonialsData.map(t => (
                        <div key={t.id} className="testimonial-card">
                            <div className="testimonial-text">"{t.text}"</div>
                            <div className="testimonial-footer">
                                <span>- {t.student}</span>
                                <div>{renderStars(t.rating)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            {/* 8. FAQ Section (Friction Reduction) */}
            <FAQSection />

            <hr />

            {/* About Section */}
            <div className="about-section">
                <h2>About The Poizdedge Institute</h2>
                <p>
                    At The Poizdedge Institute, we are committed to fostering clinical excellence through rigorous education and practical application. Our programs are developed by industry leaders and experienced clinicians to ensure relevance and impact. We empower professionals to advance their careers and contribute meaningfully to healthcare innovation and patient outcomes. Join our community of dedicated learners and achieve your highest potential.
                </p>
            </div>
            
            {/* Fixed Sticky CTA Bar (Mobile Only) */}
            <div className="fixed-cta-bar">
                <div className="cta-price-mobile">{courseData.price}</div>
                <button className="cta-button-mobile action-button">
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default ClinicalResearchPage;