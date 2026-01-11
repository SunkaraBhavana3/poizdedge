import React from 'react';
import { FaUserFriends, FaStar, FaClock, FaChartBar, FaCheckCircle, FaDownload, FaCertificate, FaComments } from 'react-icons/fa';
import './CourseDetails.css'; // Import the CSS file

// Reusable component for the four main statistic boxes
const StatCard = ({ icon: Icon, title, value }) => (
    <div className="stat-card">
        <Icon className="stat-icon" />
        <p className="stat-title">{title}</p>
        <p className="stat-value">{value}</p>
    </div>
);

// Reusable component for the lists (What You'll Learn, Features)
const FeatureList = ({ title, items }) => (
    <div className="feature-list-section">
        <h3>{title}</h3>
        <div className="list-grid">
            {items.map((item, index) => (
                <div key={index} className="list-item">
                    <FaCheckCircle className="check-icon" />
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
);

const InstructorProfile = ({ instructor }) => (
    <div className="instructor-profile">
        <h3>Your Instructor</h3>
        <div className="instructor-content">
            <img 
                src={instructor.imageUrl} 
                alt={instructor.name} 
                className="instructor-img" 
            />
            <div className="instructor-details">
                <h4>{instructor.name}</h4>
                <p className="instructor-title">{instructor.title}</p>
                <p className="instructor-bio">{instructor.bio}</p>
                <div className="instructor-stats">
                    <span>⭐ {instructor.rating} Instructor Rating</span>
                    <span>🧑‍🤝‍🧑 {instructor.students} Students</span>
                    <span>📊 {instructor.courses} Courses</span>
                </div>
            </div>
        </div>
    </div>
);

function CourseDetails() {
    // Data from the screenshots
    const courseStats = [
        { icon: FaUserFriends, title: "Students Enrolled", value: "125,847" },
        { icon: FaStar, title: "Rating", value: "4.8 (32,451)" },
        { icon: FaClock, title: "Duration", value: "12h 30m" },
        { icon: FaChartBar, title: "Level", value: "Beginner to Advanced" },
    ];

    const learningOutcomes = [
        "Build responsive websites using HTML, CSS, and JavaScript",
        "Master React and modern JavaScript ES6+ features",
        "Create interactive user interfaces with React Hooks",
        "Understand component-based architecture",
        "Work with state management and props",
        "Implement routing with React Router",
        "Deploy web applications to production",
        "Apply best practices and coding standards",
    ];
    
    const courseFeatures = [
        "Lifetime access to all course materials",
        "Downloadable resources and cheat sheets",
        "Interactive quizzes after each module",
        "Certificate of completion",
        "Progress tracking and achievements",
        "Discussion forum for Q&A",
    ];

    const requirements = [
        "A computer with internet connection",
        "Basic understanding of how websites work",
        "Willingness to learn and practice coding",
        "No prior programming experience required",
    ];

    const targetAudience = [
        "Beginners who want to become web developers.",
        "Students looking to build their first website",
        "Professionals transitioning to web development",
        "Entrepreneurs wanting to build their own web applications",
        "Anyone interested in learning modern web technologies",
    ];

    const instructorData = {
        name: "Dr. Sarah Johnson",
        title: "Senior Web Developer & Instructor",
        bio: "With over 10 years of experience in web development and teaching, Sarah has helped thousands of students launch their careers in tech. She specializes in making complex concepts easy to understand and enjoys seeing her students succeed.",
        rating: 4.8,
        students: "125,000",
        courses: "12",
        imageUrl: "placeholder-instructor.jpg" // Replace with actual image path
    };

    return (
        <div className="course-details-container">
            {/* 1. Stat Cards Section */}
            <div className="stat-cards-grid">
                {courseStats.map((stat, index) => (
                    <StatCard key={index} icon={stat.icon} title={stat.title} value={stat.value} />
                ))}
            </div>

            {/* 2. What You'll Learn Section */}
            <FeatureList title="What You'll Learn" items={learningOutcomes} />
            
            <hr className="divider" />
            
            {/* 3. Course Features Section */}
            <div className="course-features-box">
                <h3 className="features-title">Course Features</h3>
                <div className="list-grid">
                    {courseFeatures.map((item, index) => (
                        <div key={index} className="list-item">
                            <FaCheckCircle className="check-icon" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="divider" />

            {/* 4. Requirements Section */}
            <div className="info-box">
                <h3>Requirements</h3>
                <ul>
                    {requirements.map((req, index) => <li key={index}>{req}</li>)}
                </ul>
            </div>

            <hr className="divider" />

            {/* 5. Who This Course Is For Section */}
            <div className="info-box">
                <h3>Who This Course Is For</h3>
                <ul>
                    {targetAudience.map((audience, index) => <li key={index}>{audience}</li>)}
                </ul>
            </div>

            <hr className="divider" />

            {/* 6. Instructor Profile Section */}
            <InstructorProfile instructor={instructorData} />

        </div>
    );
}

export default CourseDetails;