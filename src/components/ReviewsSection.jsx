// components/ReviewsSection.jsx
import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

// Mock data for display purposes
const mockReviews = [
    { id: 1, user: "Alice C.", rating: 5.0, text: "Excellent course! Very practical examples.", date: "2 weeks ago" },
    { id: 2, user: "Bob F.", rating: 4.0, text: "Good material, sometimes the video quality was a bit low.", date: "1 month ago" },
];

const renderStars = (rating) => { /* ... (Your existing renderStars logic) ... */ };

const ReviewsSection = ({ averageRating, totalReviews }) => (
    <Card className="shadow-lg mb-4 border-0">
        <Card.Header className="fw-bold h4" style={{ color: 'var(--udemy-text)' }}>
            Student Feedback & Reviews
        </Card.Header>
        <Card.Body>
            <Row className="align-items-center mb-3">
                <Col xs={3} className="text-center">
                    <h1 className="display-4 fw-bold text-warning">{averageRating.toFixed(1)}</h1>
                    <div className="mb-2">{renderStars(averageRating)}</div>
                    <p className="small text-muted">{totalReviews.toLocaleString()} ratings</p>
                </Col>
                <Col xs={9}>
                    <p className="small mb-0 text-muted">A simple visualization of the review distribution can go here.</p>
                </Col>
            </Row>
            
            <h5 className="mt-4 border-top pt-3">Top Reviews</h5>
            {mockReviews.map(review => (
                <div key={review.id} className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <Badge className="p-1 fw-bold" bg="warning">{review.rating} <FaStar size={12} /></Badge>
                        <span className="small text-muted">{review.date}</span>
                    </div>
                    <p className="fw-bold mb-1 mt-2">{review.user}</p>
                    <p className="small mb-0">{review.text}</p>
                </div>
            ))}
        </Card.Body>
    </Card>
);

export default ReviewsSection;