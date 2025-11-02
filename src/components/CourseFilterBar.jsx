// File: components/CourseFilterBar.js

import React from 'react';

const subjects = ["Mathematics", "Science", "English", "History", "GCP Mastery"];
const grades = ["Class 10", "Class 12", "Undergrad", "Professional Cert"];

const CourseFilterBar = () => {
    // In a real app, you'd use useState for the selected filters
    const handleFilterChange = (type, value) => {
        console.log(`Filter changed: ${type} set to ${value}`);
        // Add logic here to redirect or filter courses
    };

    return (
        <div className="filter-bar-container">
            <div className="filter-bar-content">
                <span className="filter-bar-label">Find Your Perfect Course:</span>
                
                <select 
                    className="filter-dropdown" 
                    onChange={(e) => handleFilterChange('grade', e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Filter by Grade/Class</option>
                    {grades.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                    ))}
                </select>

                <select 
                    className="filter-dropdown" 
                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                    defaultValue=""
                >
                    <option value="" disabled>Filter by Subject/Program</option>
                    {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                    ))}
                </select>

                <button className="filter-button">
                    Search 🔎
                </button>
            </div>
        </div>
    );
};

export default CourseFilterBar;