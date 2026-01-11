import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaTv, FaFileDownload, FaMobileAlt, FaCertificate } from 'react-icons/fa';

// Map icon names (strings) to actual React icons
const iconMap = {
    FaTv: FaTv,
    FaFileDownload: FaFileDownload,
    FaMobileAlt: FaMobileAlt,
    FaCertificate: FaCertificate,
    // Add more icons as needed
};

/**
 * @param {Array<Object>} details - List of course features. 
 * e.g., [{ icon: 'FaTv', label: 'Video Content', value: '10.5 Hours' }]
 */
const CourseOverviewSection = ({ details = [] }) => {
    
    // Ensure we have details to render
    if (!details || details.length === 0) {
        return null;
    }

    return (
        <Card className="shadow-sm mb-4 border-0 p-4">
            <h4 className="fw-bolder mb-4 pb-2 border-bottom" style={{ color: 'var(--udemy-text)' }}>
                <FaCheckCircle className="me-2 text-success" /> Course Includes
            </h4>
            
            <Row xs={1} md={2} className="g-3">
                {details.map((item, index) => {
                    // Get the dynamic icon based on the string name
                    const IconComponent = iconMap[item.icon] || FaCheckCircle; 

                    return (
                        <Col key={index}>
                            <div className="d-flex align-items-start">
                                <IconComponent className="me-3 mt-1" size={20} style={{ color: 'var(--udemy-primary)' }} />
                                <div>
                                    <p className="mb-0 fw-bold" style={{ color: 'var(--udemy-text)' }}>{item.value}</p>
                                    <p className="small text-muted mb-0">{item.label}</p>
                                </div>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Card>
    );
};

export default CourseOverviewSection;