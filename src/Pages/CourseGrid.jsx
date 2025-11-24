// --- CourseGrid.jsx ---
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

// --- Inject CSS once ---
const injectCardStyles = () => {
  if (document.getElementById('course-card-styles')) return;
  const css = `
    .course-grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      padding: 50px 20px;
      max-width: 1300px;
      margin: 0 auto;
      background-color: #f7f9fc;
    }
    .course-card {
      position: relative;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }
    .course-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15);
    }
    .course-card-image-wrapper {
      position: relative;
      overflow: hidden;
    }
    .course-card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-bottom: 4px solid #0b3d91;
    }
    .highlight-tag {
      position: absolute;
      top: 15px;
      right: 15px;
      background-color: #ffc107;
      color: #333;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 10px;
      border-radius: 5px;
      z-index: 10;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .highlight-tag.new { background-color: #28a745; color: white; }
    .course-card-content { padding: 25px; display: flex; flex-direction: column; flex-grow: 1; }
    .course-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .course-badge { font-size: 0.8rem; font-weight: 700; color: #0b3d91; background-color: #e6f0ff; padding: 5px 10px; border-radius: 5px; letter-spacing: 0.5px; }
    .rating { display: flex; align-items: center; color: #ffc107; font-size: 0.9rem; font-weight: 600; }
    .rating-star { margin-right: 3px; }
    .course-card-title { font-size: 1.3rem; font-weight: 700; color: #1a1a1a; margin-bottom: 5px; }
    .instructor-name { font-size: 0.9rem; color: #555; margin-bottom: 15px; }
    .course-card-subtitle { font-size: 0.9rem; color: #666; margin-bottom: 20px; line-height: 1.5; flex-grow: 1; }
    .course-card-footer { border-top: 1px solid #f0f0f0; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
    .course-price { font-size: 1.4rem; font-weight: 800; color: #0b3d91; }
    .course-actions { display: flex; gap: 10px; }
    .btn { padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: background-color 0.2s, transform 0.1s; text-decoration: none; display: inline-block; }
    .btn:active { transform: scale(0.98); }
    .btn-view-details { background-color: #f0f3f7; color: #0b3d91; }
    .btn-view-details:hover { background-color: #e0e6ed; }
    .btn-enroll-now { background-color: #0b3d91; color: white; }
    .btn-enroll-now:hover { background-color: #082a6b; }
  `;
  const styleTag = document.createElement('style');
  styleTag.id = 'course-card-styles';
  styleTag.type = 'text/css';
  styleTag.appendChild(document.createTextNode(css));
  document.head.appendChild(styleTag);
};

// --- CourseCard Component ---
const CourseCard = ({ course }) => (
  <div className="course-card">
    <div className="course-card-image-wrapper">
      <img src={course.image} alt={course.title} className="course-card-image" />
      {course.tag && <div className={`highlight-tag ${course.tag.toLowerCase().replace(' ', '-')}`}>{course.tag}</div>}
    </div>
    <div className="course-card-content">
      <div className="course-meta">
        <div className="course-badge">{course.level} • {course.duration}</div>
        <div className="rating">
          <FaStar className="rating-star" />{course.rating}
        </div>
      </div>
      <h3 className="course-card-title">{course.icon} {course.title}</h3>
      <p className="instructor-name">Taught by {course.instructor}</p>
      <p className="course-card-subtitle">{course.description}</p>
    </div>
    <div className="course-card-footer">
      <div className="course-price">₹{course.price}</div>
      <div className="course-actions">
        <Link to={course.path} className="btn btn-view-details">View Details</Link>
        <Link to={`/enrollment/${course.slug}`} className="btn btn-enroll-now">Enroll Now</Link>
      </div>
    </div>
  </div>
);

// --- CourseGrid Component ---
const CourseGrid = () => {
  useEffect(() => { injectCardStyles(); }, []);

  const courses = [
    { id: 1, icon: '📐', tag: 'Best Seller', slug: 'clinical-research', title: 'Clinical Research', path: '/course-details/clinical-research', image: 'https://images.unsplash.com/photo-1532012195252-566bc901a580?q=80&w=2070&auto=format&fit=crop', description: 'Master differentiation, integration, and differential equations with challenging problem sets.', price: 4999, level: 'Advanced', duration: '2 Months', instructor: 'Dr. Neha Sharma', rating: 4.8 },
    { id: 2, icon: '🔬', tag: 'New', slug: 'pharmacovigilance', title: 'Pharmacovigilance', path: '/course-details/pharmacovigilance', image: 'https://images.unsplash.com/photo-1581093557989-08226021f155?q=80&w=2070&auto=format&fit=crop', description: 'Comprehensive study of Mechanics, Optics, and practical lab techniques.', price: 5499, level: 'Intermediate', duration: '2 Months', instructor: 'Prof. Ravi Menon', rating: 4.5 },
    { id: 3, icon: '💻', slug: 'clinical-data', title: 'Clinical Data Management', path: '/course-details/clinical-data', image: 'https://images.unsplash.com/photo-1550060938-26154c148283?q=80&w=2070&auto=format&fit=crop', description: 'Hands-on introduction to fundamental programming concepts, loops, and data structures.', price: 3999, level: 'Beginner', duration: '2 Months', instructor: 'Mr. Rohan Gupta', rating: 4.9 },
    { id: 4, icon: '🧬', tag: 'Best Seller', slug: 'regulatory', title: 'Regulatory Affairs', path: '/course-details/regulatory', image: 'https://images.unsplash.com/photo-1583947233621-e7300f898396?q=80&w=2070&auto=format&fit=crop', description: 'Deep dive into Genetics, Cell Biology, and Human Physiology with animated lectures.', price: 4299, level: 'Intermediate', duration: '2 Months', instructor: 'Dr. Anjali Rao', rating: 4.7 },
    { id: 5, icon: '🗣️', slug: 'sas', title: 'Clinical SAS Programming', path: '/course-details/sas', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a724?q=80&w=2070&auto=format&fit=crop', description: 'Critical analysis of major literary works, poetry, and essay writing development.', price: 3199, level: 'Intermediate', duration: '3 Months', instructor: 'Ms. Priya Singh', rating: 4.6 },
    { id: 6, icon: '🌍', tag: 'New', slug: 'world-history', title: 'World History', path: '/course-details/world-history', image: 'https://images.unsplash.com/photo-1542840505-59b152d58048?q=80&w=2070&auto=format&fit=crop', description: 'A study of key global historical periods from the French Revolution to the modern era.', price: 3799, level: 'Beginner', duration: '14 Weeks', instructor: 'Dr. Vivek Soni', rating: 4.4 },
  ];

  return (
    <div className="course-grid-container">
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  );
};

export default CourseGrid;
