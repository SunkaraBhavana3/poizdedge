// --- CourseGrid.jsx ---
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";

// --- Inject CSS once ---
const injectCardStyles = () => {
  if (document.getElementById("course-card-styles")) return;
  const css = `
    .course-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
      background-color: #f7f9fc;
    }
    .course-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s, box-shadow 0.3s;
      height: 100%;
    }
    .course-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 25px rgba(0,0,0,0.12);
    }
    .course-card img {
      width: 100%;
      height: auto;
      max-height: 200px;
      object-fit: contain;
      background: #f0f0f0;
    }
    .highlight-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ffc107;
      color: #333;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 5px;
      z-index: 10;
    }
    .highlight-tag.new { background: #28a745; color: #fff; }
    .course-card-content {
      padding: 20px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .course-meta { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 8px; 
      font-size: 0.85rem; 
    }
    .course-badge { 
      color: #0b3d91; 
      background: #e6f0ff; 
      padding: 3px 8px; 
      border-radius: 5px; 
      font-weight: 600; 
    }
    .rating { 
      display: flex; 
      align-items: center; 
      color: #ffc107; 
      font-weight: 600; 
    }
    .course-card-title { 
      font-size: 1.2rem; 
      font-weight: 700; 
      margin: 6px 0; 
      color: #1a1a1a; 
    }
    .instructor-name { 
      font-size: 0.85rem; 
      color: #555; 
      margin-bottom: 10px; 
    }
    .course-card-subtitle { 
      font-size: 0.85rem; 
      color: #666; 
      flex-grow: 1; 
      margin-bottom: 15px; 
      line-height: 1.4; 
    }
    .course-card-footer { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 15px 20px; 
      border-top: 1px solid #eee; 
    }
    .course-price { 
      font-weight: 700; 
      color: #0b3d91; 
      font-size: 1.2rem; 
    }
    .btn { 
      padding: 10px 16px; 
      border-radius: 6px; 
      font-weight: 600; 
      text-decoration: none; 
      font-size: 0.85rem; 
      transition: 0.2s; 
      display: inline-block; 
    }
    .btn-view-details { 
      background: #f0f3f7; 
      color: #0b3d91; 
    }
    .btn-view-details:hover { background: #e0e6ed; }
    .btn-enroll-now { background: #0b3d91; color: #fff; }
    .btn-enroll-now:hover { background: #082a6b; }
  `;
  const styleTag = document.createElement("style");
  styleTag.id = "course-card-styles";
  styleTag.appendChild(document.createTextNode(css));
  document.head.appendChild(styleTag);
};

// --- Course Card ---
const CourseCard = ({ course }) => (
  <div className="course-card">
    <div style={{ position: "relative" }}>
      <img src={course.imageBase64 || course.image} alt={course.title} />
      {course.tag && (
        <div
          className={`highlight-tag ${course.tag.toLowerCase().replace(" ", "-")}`}
        >
          {course.tag}
        </div>
      )}
    </div>

    <div className="course-card-content">
      {/* Level & Duration */}
      <div className="course-meta">
        <div className="course-badge">
          {course.level || "Beginner"} • {course.duration}
        </div>

        <div className="rating">
          <FaStar style={{ marginRight: "4px" }} />
          {course.rating || 5}
        </div>
      </div>

      <h3 className="course-card-title">
        {course.icon || ""} {course.title}
      </h3>

      <p className="instructor-name">Taught by {course.lecture}</p>

      <p className="course-card-subtitle">
        {course.description?.slice(0, 100)}...
      </p>
    </div>

    {/* --- ENROLL & VIEW BUTTONS (UPDATED) --- */}
    <div className="course-card-footer">
      <div className="course-price">₹{course.price}</div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Link
          to={`/course-details/${course.courseId}`}
          className="btn btn-view-details"
        >
          View Details
        </Link>

       <Link to={`/enrollment/${course.courseId}`} className="btn btn-enroll-now">
  Enroll Now
</Link>

      </div>
    </div>
  </div>
);

// --- CourseGrid Component ---
const CourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectCardStyles();

    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE || "https://poizdedgebackend.onrender.com"}/api/course`
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="text-center p-10">Loading courses…</div>;
  if (!courses.length)
    return <div className="text-center p-10">No courses available.</div>;

  return (
    <div className="course-grid-container">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
