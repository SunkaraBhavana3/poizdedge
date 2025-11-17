import React, { useState } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure you have this import
import { PlayCircleFill, CreditCard, ClockFill, StarFill, FilePlayFill, CalendarEvent } from 'react-bootstrap-icons'; // Using React-Bootstrap Icons

// Define brand colors based on the screenshot
const UI_COLORS = {
    primary: "#007bff", // Standard Blue for CTA button
    tealHeader: "#008080", // Teal/Dark Cyan for the header background
    freeBadge: "#28a745", // Green for the 'FREE' badge
    buttonBlue: "#007bff", // Bright Blue for 'Start Free' button
    lightGray: "#f4f7f9", // Background color
    darkText: "#333",
    subText: "#666",
    // Deep Blue from your original code, kept for consistency in modals
    modalPrimary: "#0D47A1",
    modalSuccess: "#2E7D32",
};

// Data structured to match the visual presentation
const demoClasses = [
    {
        id: 101,
        title: "Mathematics Demo - Class 10",
        description: "Free demo classes for Mathematics - Get a preview of our teaching methodology",
        rating: 4.8,
        videos: 3,
        duration: "1 week",
        image: "https://via.placeholder.com/400x200?text=Math+Demo+Book", // Placeholder image
        tags: ["Mathematics", "Class 10"],
        price: 0,
        videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY", // Sample video
    },
    {
        id: 102,
        title: "Science Demo - Class 10",
        description: "Free demo classes for Science - Experience our interactive teaching approach",
        rating: 4.9,
        videos: 3,
        duration: "1 week",
        image: "https://via.placeholder.com/400x200?text=Science+Class+Students", // Placeholder image
        tags: ["Science", "Class 10"],
        price: 0,
        videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
];

// Combine all your original paid courses and the new demo courses for the CTA (for completeness)
const allCourses = [
    ...demoClasses,
    { id: 2, title: "MCA - Web Development Bootcamp", description: "Learn full-stack web development...", price: 4999, type: "Paid", icon: "💻" },
    { id: 4, title: "MCA - Data Science & AI", description: "Learn Python, ML, and AI concepts...", price: 6999, type: "Paid", icon: "🤖" },
];


/* --- Reusable Components for the UI --- */

// Feature Card Component (top section)
const FeatureCard = ({ Icon, title, subtitle }) => (
    <Card 
        className="text-center h-100 border-0 shadow-sm"
        style={{ minWidth: '250px', transform: 'translateY(-20px)', zIndex: 10 }}
    >
        <Card.Body className="p-4">
            <Icon size={30} className="mb-2" style={{ color: UI_COLORS.buttonBlue }} />
            <Card.Title className="fw-bold fs-6">{title}</Card.Title>
            <Card.Text className="text-muted small">{subtitle}</Card.Text>
        </Card.Body>
    </Card>
);

// Demo Class Card Component
const DemoClassCard = ({ course, handleCourseClick }) => {
    return (
        <Card className="h-100 border-0 rounded-3 overflow-hidden shadow-sm">
            <div style={{ position: 'relative' }}>
                <Card.Img variant="top" src={course.image} alt={course.title} height="180" style={{ objectFit: 'cover' }} />
                <span 
                    className="badge fw-bold position-absolute top-0 end-0 m-2 px-3 py-2"
                    style={{ backgroundColor: UI_COLORS.freeBadge }}
                >
                    FREE
                </span>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold" style={{ fontSize: '1.15rem' }}>{course.title}</Card.Title>
                <Card.Text className="text-muted small">{course.description}</Card.Text>

                {/* Details Row */}
                <div className="d-flex gap-3 mb-3 small text-muted align-items-center">
                    <span className="d-flex align-items-center"><StarFill style={{ color: '#ffc107', marginRight: '4px' }} size={12} /> {course.rating}</span>
                    <span className="d-flex align-items-center"><FilePlayFill style={{ marginRight: '4px' }} size={12} /> {course.videos} videos</span>
                    <span className="d-flex align-items-center"><ClockFill style={{ marginRight: '4px' }} size={12} /> {course.duration}</span>
                </div>

                {/* Tags */}
                <div className="mb-3">
                    {course.tags.map(tag => (
                        <span key={tag} className="badge me-2" style={{ backgroundColor: '#e9ecef', color: UI_COLORS.darkText, fontWeight: 'normal' }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="mt-auto d-flex justify-content-between gap-2">
                    <Button variant="outline-secondary" size="sm" style={{ flex: 1, borderColor: '#ced4da', color: UI_COLORS.subText }}>
                        Free Demo
                    </Button>
                    <Button variant="outline-secondary" size="sm" style={{ flex: 1, borderColor: '#ced4da', color: UI_COLORS.subText }}>
                        View Details
                    </Button>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        style={{ flex: 1, backgroundColor: UI_COLORS.buttonBlue, borderColor: UI_COLORS.buttonBlue, fontWeight: 'bold' }}
                        onClick={() => handleCourseClick(course)}
                    >
                        Start Free
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

/* --- Main Component --- */

const CoursePage = () => {
    // Keep your original state management for course interaction
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        // Assuming only demo classes are displayed on this page, but keeping the check for safety
        if (course.price === 0) {
            setShowPayment(false); // Opens Demo Modal
        }
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setShowPayment(false);
    };

    // The original logic for Paid courses is no longer directly used on the visible cards,
    // but the Modal remains for potential use with the "Browse All Courses" CTA.

    return (
        <div style={{ backgroundColor: UI_COLORS.lightGray }}>
            {/* Header Section (Teal Background) */}
            <header className="py-5" style={{ backgroundColor: UI_COLORS.tealHeader, color: 'white' }}>
                <div className="container">
                    <h1 className="fw-bold mb-1" style={{ fontSize: '2em' }}>Free Demo Classes</h1>
                    <p className="lead" style={{ opacity: 0.9 }}>
                        Experience our teaching methodology with free demo classes - **No payment required!**
                    </p>
                </div>
            </header>

            {/* Feature Cards Section */}
            <div className="container" style={{ marginBottom: '50px' }}>
                <Row className="justify-content-center g-4">
                    <Col xs={12} md={4}>
                        <FeatureCard 
                            Icon={PlayCircleFill}
                            title="Free Preview Videos"
                            subtitle="Watch sample lectures from our expert teachers"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <FeatureCard 
                            Icon={CreditCard}
                            title="No Credit Card Required"
                            subtitle="Start learning immediately without any payment"
                        />
                    </Col>
                    <Col xs={12} md={4}>
                        <FeatureCard 
                            Icon={ClockFill}
                            title="Unlimited Access"
                            subtitle="Access demo content anytime, anywhere"
                        />
                    </Col>
                </Row>
            </div>

            {/* Available Demo Classes Section */}
            <div className="container py-4">
                <h2 className="mb-4" style={{ color: UI_COLORS.darkText }}>Available Demo Classes</h2>
                <Row className="g-4">
                    {demoClasses.map((course) => (
                        <Col key={course.id} xs={12} lg={6}>
                            <DemoClassCard course={course} handleCourseClick={handleCourseClick} />
                        </Col>
                    ))}
                </Row>
            </div>
            
            {/* Upgrade Call-to-Action Banner */}
            <div className="my-5 p-5 text-center" style={{ backgroundColor: '#0056b3', color: 'white' }}>
                <h3 className="mb-1">Ready for the Full Experience?</h3>
                <p className="lead mb-4">
                    Upgrade to our paid courses for complete access to all lectures, materials, and tests.
                </p>
                <Button 
                    variant="light" 
                    className="fw-bold px-4 py-2"
                    // Placeholder action for the "Browse All Courses" button
                    onClick={() => alert("Redirecting to the Full Course Catalog...")}
                >
                    Browse All Courses
                </Button>
            </div>


            {/* --- MODALS (Your Original Logic) --- */}

            {/* Demo Modal (Only opens if selectedCourse exists AND price is 0) */}
            {selectedCourse && selectedCourse.price === 0 && (
                <Modal show={!!selectedCourse} onHide={closeModal} size="lg" centered>
                    <Modal.Header closeButton style={{ backgroundColor: UI_COLORS.modalSuccess }} className="text-white">
                        <Modal.Title className="fw-bold">
                            {selectedCourse.title} - Free Demo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-4">
                        {selectedCourse.videoLink ? (
                            <div className="ratio ratio-16x9 border rounded-3 overflow-hidden">
                                <iframe
                                    src={selectedCourse.videoLink}
                                    title={`${selectedCourse.title} Demo Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-center p-5 bg-light rounded-3">
                                <h4 className="text-danger">Video Unavailable 🥺</h4>
                                <p>The demo video for this course is coming soon!</p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close Preview
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Note: I'm omitting the Payment Modal since the current page only shows FREE demos, 
            but you can re-integrate your original payment modal logic if needed for the 
            'Browse All Courses' functionality. */}

        </div>
    );
};

export default CoursePage;