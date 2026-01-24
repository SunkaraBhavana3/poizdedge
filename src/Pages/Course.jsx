import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaCheckCircle,
  FaBookOpen,
  FaUserTie,
  FaSeedling,
  FaHandsHelping,
} from "react-icons/fa";
import axios from "axios";
import EnrollModal from "../components/EnrollModal";

/* -------------------- PLAN DATA -------------------- */
const coursePlans = [
  
    {
    tier: "Self paced learning",
    // price: "₹4,999",
    description:  "Flexible self-paced learning designed for beginners, allowing you to learn comfortably at your own pace.",
    keyFeature:  "Ideal for Beginners & Aspirants",
    access: "Learn at Your Own Comfort",
    support: "Pause & Restart Anytime",
  },
  {
    tier: "Intermediate",
    // price: "₹9,999",
    description: "Trainer-assisted learning with live interactive sessions, doubt clearing, and progress-based assessments.",
    keyFeature: "Doubt Clearing & Assessments",
    access: "Live Interactive Sessions",
    support: "Trainer Assisted Learning",
  },
  {
    tier: "Classic",
    // price: "₹14,999",
    description: "Most popular learning plan with industry and interview-focused live sessions, exclusive Q&A, and project-based assessment.",
    keyFeature: "Industry Project Based on Assessment",
    access: "Industry & Interview Focused Learning",
    support: "Live Sessions with Exclusive Q&A",
    popular: true,
  },
  {
    tier: "Premium",
    // price: "₹24,999",
    description:  "Exclusive mentorship for limited candidates with focused individual guidance, skill improvement, and interview readiness.",
    keyFeature: "Interview Readiness & Soft Skills",
    access: "Exclusive Mentorship Program",
    support: "Limited Candidates – Individual Focus",
  },
];
/* -------------------- RESPONSIVE STYLES -------------------- */
const injectCardStyles = () => {
  if (document.getElementById("course-styles")) return;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    body { margin: 0; font-family: 'Inter', sans-serif; background:#fdfdfd; color: #333; }
    .course-page-wrapper { width:100%; overflow-x: hidden; }

    /* HERO SECTION */
    .reg-hero-section {
      background: linear-gradient(135deg,#f8f9fb,#e1e9f5);
      padding: 60px 20px;
      text-align: center;
    }
    .reg-hero-content h1 {
      font-size: clamp(1.8rem, 5vw, 2.6rem);
      color: #0b3d91;
      font-weight: 800;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    .reg-hero-content p {
      font-size: clamp(1rem, 2vw, 1.1rem);
      color: #444;
      margin-bottom: 30px;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .btn-reg-submit {
      padding: 14px 32px;
      background: #0b3d91;
      color: #fff;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.05rem;
      text-decoration: none;
      display: inline-block;
      transition: 0.3s;
    }
    .btn-reg-submit:hover { background: #083070; transform: translateY(-2px); }

    /* CONTAINER */
    .main-content-padding {
      max-width: 1400px; 
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* GOAL SELECTOR */
    .goal-selector-block {
      background: #fff;
      padding: 30px 20px;
      border-radius: 15px;
      box-shadow: 0 4px 20px rgba(0,0,0,.06);
      text-align: center;
      margin-bottom: 50px;
    }
    .goal-buttons-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin-top: 25px;
    }
    .btn-goal {
      background: #f0f3f7;
      border: 2px solid #f0f3f7;
      padding: 12px 15px;
      border-radius: 10px;
      font-weight: 600;
      color: #0b3d91;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      justify-content: center;
      transition: 0.3s;
      font-size: 0.9rem;
    }
    .btn-goal.active { background: #0b3d91; color: #fff; border-color: #0b3d91; }
    
    .goal-info-box {
      margin-top: 25px;
      background: #eef4ff;
      padding: 15px;
      border-radius: 10px;
      color: #0b3d91;
      font-weight: 500;
      border-left: 5px solid #0b3d91;
      font-size: 0.95rem;
      text-align: left;
    }

    /* PRICING GRID */
    .pricing-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }
    .pricing-card {
      background: #fff;
      padding: 30px 20px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,.05);
      border: 1px solid #e1e9f5;
      position: relative;
      display: flex;
      flex-direction: column;
      transition: 0.3s ease;
    }
    
    .pricing-card:hover { 
      transform: translateY(-8px); 
      border: 1.5px solid #0b3d91;
      box-shadow: 0 15px 35px rgba(11, 61, 145, 0.15);
    }

    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #0b3d91;
      color: #fff;
      padding: 4px 14px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
      text-transform: uppercase;
    }

    .price-text {
      font-size: 2.2rem;
      font-weight: 900;
      color: #0b3d91;
      margin: 10px 0;
      text-align: center;
    }

    .pricing-card ul { list-style: none; padding: 0; margin: 20px 0; flex-grow: 1; }
    .pricing-card li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 0.9rem;
      color: #555;
      text-align: left;
    }
    
    .pricing-card li svg {
        flex-shrink: 0;
        margin-top: 3px;
    }

    .btn-plan-enroll {
      display: block;
      width: 100%;
      padding: 14px 0;
      background: #0b3d91;
      color: #fff !important;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(11, 61, 145, 0.1);
      cursor: pointer;
      border: none;
    }

    /* -------------------- 4-COLUMN CENTERED GRID -------------------- */
    .course-grid-container {
      display: flex; /* Using flex instead of grid to allow centering remaining cards */
      flex-wrap: wrap;
      justify-content: center; /* This centers the 9th and 10th cards */
      gap: 25px;
      margin-top: 30px;
    }

    .course-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      /* Logic: (100% / 4) - gap adjustment */
      width: calc(25% - 20px); 
      min-width: 280px; 
      border: 1px solid #eee;
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    /* CARD HOVER EFFECT */
    .course-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(11, 61, 145, 0.12);
      border-color: #0b3d91;
    }

    .course-image-wrapper {
      width: 100%;
      height: 180px;
      background: #f8fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
    }
    .course-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    
    .course-card:hover img {
        transform: scale(1.08);
    }

    .course-card-content { padding: 20px; flex-grow: 1; }
    
    .course-card-content h3 {
        color: #0b3d91;
        margin-bottom: 8px;
        font-size: 1.1rem;
        line-height: 1.3;
        height: 2.6em; /* Keeps card heights uniform */
        overflow: hidden;
    }

    .course-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      background: #fafafa;
      border-top: 1px solid #eee;
    }

    .btn-enroll {
      background: #0b3d91;
      color: #fff;
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }

    .btn-enroll:hover {
      background: #000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    /* RESPONSIVE BREAKPOINTS */
    @media (max-width: 1200px) { .course-card { width: calc(33.33% - 20px); } }
    @media (max-width: 900px) { .course-card { width: calc(50% - 20px); } }
    @media (max-width: 600px) { .course-card { width: 100%; } }
  `;

  const style = document.createElement("style");
  style.id = "course-styles";
  style.innerHTML = css;
  document.head.appendChild(style);
};

/* -------------------- MAIN COMPONENT -------------------- */
const CourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGoal, setActiveGoal] = useState("knowledge");
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    injectCardStyles();
    axios
      .get("https://poizdedgebackend.onrender.com/api/course")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const goalContent = {
    knowledge: "Master core subjects with clear explanations, real examples, and complete doubt resolution.",
    interview: "Get interview-ready with practical training and confidence building.",
    beginner: "Start from basics with step-by-step learning for beginners.",
    mentorship: "Learn with friendly mentors who guide you personally.",
  };

  const handleEnrollClick = (planTier) => {
    setSelectedPlan(planTier);
    setShowModal(true);
  };

  const filteredCourses = useMemo(() => {
    if (activeGoal === "beginner") {
      return courses.filter((c) => c.level?.toLowerCase() === "beginner");
    }
    return courses;
  }, [courses, activeGoal]);

  return (
    <div className="course-page-wrapper">
      <section className="reg-hero-section">
        <div className="reg-hero-content">
          <h1>Register for Free Demo Classes and Webinar!</h1>
          <p>Learn with clarity, confidence, and real-world examples from experts.</p>
          <Link to="/register" className="btn-reg-submit">Join Us</Link>
        </div>
      </section>

      <div className="main-content-padding">
        {/* GOAL SELECTOR */}
        <div className="goal-selector-block">
          <h2 style={{ color: "#0b3d91", fontWeight: 800, fontSize: '1.5rem', marginBottom: '10px' }}>
            What brings you to Poizdedge today?
          </h2>
          <div className="goal-buttons-container">
            <button className={`btn-goal ${activeGoal === "knowledge" ? "active" : ""}`} onClick={() => setActiveGoal("knowledge")}>
              <FaBookOpen size={20} /> <span>Knowledge</span>
            </button>
            <button className={`btn-goal ${activeGoal === "interview" ? "active" : ""}`} onClick={() => setActiveGoal("interview")}>
              <FaUserTie size={20} /> <span>Interviews</span>
            </button>
            <button className={`btn-goal ${activeGoal === "beginner" ? "active" : ""}`} onClick={() => setActiveGoal("beginner")}>
              <FaSeedling size={20} /> <span>Beginner</span>
            </button>
            <button className={`btn-goal ${activeGoal === "mentorship" ? "active" : ""}`} onClick={() => setActiveGoal("mentorship")}>
              <FaHandsHelping size={20} /> <span>Mentorship</span>
            </button>
          </div>
          <div className="goal-info-box">{goalContent[activeGoal]}</div>
        </div>

        {/* PRICING SECTION */}
        <h2 style={{ textAlign: "center", color: "#0b3d91", fontSize: "2rem", fontWeight: 800, marginBottom: "30px" }}>
          Choose Your Plan
        </h2>

        <div className="pricing-grid-container">
          {coursePlans.map((plan) => (
            <div className="pricing-card" key={plan.tier}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3 style={{ color: "#0b3d91", margin: 0, fontSize: '1.2rem', textAlign:'center' }}>{plan.tier}</h3>
              <div className="price-text">{plan.price}</div>
              <p style={{ color: "#666", fontSize: "0.85rem", margin: 0, lineHeight: 1.4, textAlign:'center' }}>{plan.description}</p>
              
              <ul>
                <li><FaCheckCircle color="#28a745" size={16} /> <span>{plan.access} Access</span></li>
                <li><FaCheckCircle color="#28a745" size={16} /> <span>{plan.support}</span></li>
                <li><FaCheckCircle color="#28a745" size={16} /> <span>{plan.keyFeature}</span></li>
              </ul>

              <div className="enroll-btn-wrapper">
                <button
                  className="btn-plan-enroll"
                  onClick={() => handleEnrollClick(plan.tier)}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <EnrollModal
          show={showModal}
          plan={selectedPlan}
          onClose={() => setShowModal(false)}
        />

        {/* EXPLORE COURSES SECTION */}
        <h2 style={{ textAlign: "center", color: "#0b3d91", marginTop: "60px", fontSize: "1.8rem", fontWeight: 800 }}>
          Explore Our Courses
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Loading courses...</p>
        ) : (
          <div className="course-grid-container">
            {filteredCourses.map((course) => (
              <div className="course-card" key={course._id}>
                <div className="course-image-wrapper">
                  <img src={course.imageBase64 || course.image || "https://via.placeholder.com/400x250"} alt={course.title} />
                </div>
                <div className="course-card-content">
                  <h3>{course.title}</h3>
                  <p style={{ color: "#666", margin: "4px 0", fontSize: '0.85rem' }}>{course.lecture}</p>
                  <p style={{ display: "flex", alignItems: "center", gap: "5px", color: '#444', fontSize: '0.9rem' }}>
                    <FaStar color="#ffc107" /> {course.rating || 5.0}
                  </p>
                </div>
                <div className="course-card-footer">
                  <Link to={`/enrollment/${course.courseId}`} className="btn-enroll">Enroll</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseGrid;
