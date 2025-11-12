import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseGrid from './CourseGrid';
import CoursePage from '../components/CoursePage'; // ✅ Import CoursePage

// Function to inject CSS dynamically
const injectStyles = () => {
    const css = `
    /* General Reset/Base Styles */
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    /* --- HeaderBanner Styling --- */
    .header-banner {
      background-color: #0b3d91; 
      color: white;
      padding: 80px 0 100px; 
      margin-bottom: 60px; 
    }

    .header-tagline {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 5px;
      opacity: 0.8;
      letter-spacing: 0.5px;
    }

    .header-title {
      font-size: 2.5rem;
      font-weight: 600;
      margin: 0;
      line-height: 1.2;
    }

    /* --- CourseFilter Styling --- */
    .main-content-area {
      margin-top: -50px; 
      padding: 0 20px;
    }

    .course-filter-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
      padding: 20px 30px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .filter-header {
      font-size: 1rem;
      font-weight: 600;
      color: #333;
      padding-bottom: 20px;
      margin-bottom: 15px;
    }

    .filter-icon {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-icon svg {
        width: 16px;
        height: 16px;
        color: #0b3d91;
    }
    
    .filter-controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .filter-control {
      flex: 1; 
      display: flex;
      align-items: center;
      background-color: #f0f3f7;
      border-radius: 6px;
      padding: 0 12px;
      min-width: 150px;
    }
    
    .search-input-wrapper {
        flex: 2; 
    }

    .search-icon {
      width: 18px;
      height: 18px;
      color: #777;
      margin-right: 10px;
    }

    .search-input {
      border: none;
      background: transparent;
      padding: 12px 0;
      font-size: 1rem;
      flex-grow: 1;
      outline: none;
    }

    .search-input::placeholder {
      color: #a0a0a0;
    }

    .dropdown-select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: none;
      background: transparent;
      padding: 12px 0;
      padding-right: 25px; 
      font-size: 1rem;
      cursor: pointer;
      flex-grow: 1;
      outline: none;
    }

    .dropdown-wrapper {
      position: relative;
    }
    
    .dropdown-wrapper:after {
        content: "▼"; 
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        color: #777;
        font-size: 0.7rem;
        pointer-events: none;
    }

    @media (max-width: 900px) {
        .filter-controls {
            gap: 10px;
        }
        .filter-control {
            min-width: 120px;
        }
    }

    @media (max-width: 600px) {
        .header-title {
            font-size: 2rem;
        }
        .filter-controls {
            flex-direction: column;
            gap: 15px;
        }
        .filter-control, .search-input-wrapper {
            flex: none; 
            width: 100%;
        }
    }
  `;
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);
};

// --- 1. Header Banner Component ---
const HeaderBanner = () => {
    return (
        <header className="header-banner">
            <div className="container">
                <p className="header-tagline">Browse Our Courses</p>
                <h1 className="header-title">Find the perfect course to achieve your academic goals</h1>
            </div>
        </header>
    );
};

// --- 2. Course Filter Component ---
const CourseFilter = () => {
    return (
        <div className="course-filter-container">
            <div className="filter-header">
                <span className="filter-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    Filter Courses
                </span>
            </div>
            <div className="filter-controls">

                <div className="filter-control search-input-wrapper">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="search" placeholder="Search courses..." className="search-input" />
                </div>

                <div className="filter-control dropdown-wrapper">
                    <select className="dropdown-select">
                        <option value="">All Subjects</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                    </select>
                </div>

                <div className="filter-control dropdown-wrapper">
                    <select className="dropdown-select">
                        <option value="">All Classes</option>
                        <option value="101">Class A</option>
                        <option value="102">Class B</option>
                    </select>
                </div>

                <div className="filter-control dropdown-wrapper">
                    <select className="dropdown-select">
                        <option value="">All Types</option>
                        <option value="online">Online</option>
                        <option value="in-person">In-Person</option>
                    </select>
                </div>
            </div>
        </div>
    );
};


const Course = () => {
  useEffect(() => {
    injectStyles(); // keep your dynamic CSS if needed
  }, []);

  return (
    <>
      <HeaderBanner />
      <div className="main-content-area">
        {/* Just render the course page content here */}
        <CourseFilter />
        <CourseGrid />
      </div>
    </>
  );
};

export default Course;
