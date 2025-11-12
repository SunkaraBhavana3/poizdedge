import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

// Function to inject CSS dynamically
const injectCardStyles = () => {
  const css = `
    .course-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
      padding: 40px 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .course-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.2s ease-in-out;
    }

    .course-card:hover {
      transform: translateY(-5px);
    }

    .course-card-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .course-card-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .course-card-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    .course-card-subtitle {
      font-size: 0.95rem;
      color: #555;
      margin-bottom: 15px;
      line-height: 1.4;
      flex-grow: 1;
    }

    .course-card-footer {
      border-top: 1px solid #eee;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .course-price {
      font-size: 1.2rem;
      font-weight: 700;
      color: #0b3d91;
    }

    .course-actions {
      display: flex;
      gap: 10px;
    }

    .btn {
      padding: 10px 18px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .btn-view-details {
      background-color: #f0f3f7;
      color: #0b3d91;
    }

    .btn-view-details:hover {
      background-color: #e0e6ed;
    }

    .btn-enroll-now {
      background-color: #0b3d91;
      color: white;
    }

    .btn-enroll-now:hover {
      background-color: #082a6b;
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(css));
  document.head.appendChild(styleTag);
};

// ✅ Course Card Component
const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-card-image" />

      <div className="course-card-content">
        <h3 className="course-card-title">{course.title} - {course.class}</h3>
        <p className="course-card-subtitle">{course.description}</p>
      </div>

      <div className="course-card-footer">
        <div className="course-price">₹{course.price}</div>
        <div className="course-actions">
          {/* Link to CoursePage and pass course data via state */}
          <Link 
            to="/course-details" 
            state={{ course }} 
            className="btn btn-view-details"
          >
            View Details
          </Link>
          <button className="btn btn-enroll-now">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

// ✅ Course Grid Component
const CourseGrid = () => {

  const courses = [
    { id: 1, image: 'https://dungarcollege.ac.in/images/2019/12/20/courses.png', title: 'Mathematics', class: 'Class 10', description: 'Complete Mathematics course for Class 10', price: 2999 },
    { id: 2, image: 'https://dungarcollege.ac.in/images/2019/12/20/courses.png', title: 'Science', class: 'Class 10', description: 'Complete Science course for Class 10', price: 3499 },
    { id: 3, image: 'https://dungarcollege.ac.in/images/2019/12/20/courses.png', title: 'English', class: 'Class 10', description: 'English grammar & comprehension', price: 1999 }
  ];

  useEffect(() => { injectCardStyles(); }, []);

  return (
    <div className="course-grid-container">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
