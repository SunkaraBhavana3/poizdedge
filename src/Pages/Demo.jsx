import React, { useState } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlayCircleFill, CreditCard, ClockFill, StarFill, FilePlayFill } from 'react-bootstrap-icons';

// UI Colors
const UI_COLORS = {
    primary: "#007bff",
    tealHeader: "#008080",
    freeBadge: "#28a745",
    buttonBlue: "#007bff",
    lightGray: "#f4f7f9",
    darkText: "#333",
    subText: "#666",
    modalSuccess: "#2E7D32",
};

// Demo classes data
const demoClasses = [
    {
        id: 101,
        title: "Mathematics Demo - Class 10",
        description: "Free demo classes for Mathematics - Get a preview of our teaching methodology",
        rating: 4.8,
        videos: 3,
        duration: "1 week",
        image: "https://via.placeholder.com/400x200?text=Math+Demo+Book",
        tags: ["Mathematics", "Class 10"],
        price: 0,
        videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
    {
        id: 102,
        title: "Science Demo - Class 10",
        description: "Free demo classes for Science - Experience our interactive teaching approach",
        rating: 4.9,
        videos: 3,
        duration: "1 week",
        image: "https://via.placeholder.com/400x200?text=Science+Class+Students",
        tags: ["Science", "Class 10"],
        price: 0,
        videoLink: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
];

// Feature Card
const FeatureCard = ({ Icon, title, subtitle }) => (
    <Card className="text-center h-100 border-0 shadow-sm" style={{ minWidth: '250px', transform: 'translateY(-20px)', zIndex: 10 }}>
        <Card.Body className="p-4">
            <Icon size={30} className="mb-2" style={{ color: UI_COLORS.buttonBlue }} />
            <Card.Title className="fw-bold fs-6">{title}</Card.Title>
            <Card.Text className="text-muted small">{subtitle}</Card.Text>
        </Card.Body>
    </Card>
);

// Demo Class Card
const DemoClassCard = ({ course, handleCourseClick }) => (
    <Card className="h-100 border-0 rounded-3 overflow-hidden shadow-sm">
        <div style={{ position: 'relative' }}>
            <Card.Img variant="top" src={course.image} alt={course.title} height="180" style={{ objectFit: 'cover' }} />
            <span className="badge fw-bold position-absolute top-0 end-0 m-2 px-3 py-2" style={{ backgroundColor: UI_COLORS.freeBadge }}>
                FREE
            </span>
        </div>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="fw-bold" style={{ fontSize: '1.15rem' }}>{course.title}</Card.Title>
            <Card.Text className="text-muted small">{course.description}</Card.Text>
            <div className="d-flex gap-3 mb-3 small text-muted align-items-center">
                <span className="d-flex align-items-center"><StarFill style={{ color: '#ffc107', marginRight: '4px' }} size={12} /> {course.rating}</span>
                <span className="d-flex align-items-center"><FilePlayFill style={{ marginRight: '4px' }} size={12} /> {course.videos} videos</span>
                <span className="d-flex align-items-center"><ClockFill style={{ marginRight: '4px' }} size={12} /> {course.duration}</span>
            </div>
            <div className="mb-3">
                {course.tags.map(tag => (
                    <span key={tag} className="badge me-2" style={{ backgroundColor: '#e9ecef', color: UI_COLORS.darkText, fontWeight: 'normal' }}>{tag}</span>
                ))}
            </div>
            <div className="mt-auto d-flex justify-content-between gap-2">
                <Button variant="outline-secondary" size="sm" style={{ flex: 1, borderColor: '#ced4da', color: UI_COLORS.subText }}>Free Demo</Button>
                <Button variant="outline-secondary" size="sm" style={{ flex: 1, borderColor: '#ced4da', color: UI_COLORS.subText }}>View Details</Button>
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

const DemoPage = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token"); // Check login status

    const handleCourseClick = (course) => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }
        setSelectedCourse(course);
    };

    const closeDemoModal = () => setSelectedCourse(null);

    return (
        <div style={{ backgroundColor: UI_COLORS.lightGray }}>
            {/* Header */}
            <header className="py-5" style={{ backgroundColor: UI_COLORS.tealHeader, color: 'white' }}>
                <div className="container">
                    <h1 className="fw-bold mb-1" style={{ fontSize: '2em' }}>Free Demo Classes</h1>
                    <p className="lead" style={{ opacity: 0.9 }}>
                        Experience our teaching methodology with free demo classes - No signup required!
                    </p>
                </div>
            </header>

            {/* Feature Cards */}
            <div className="container" style={{ marginBottom: '50px' }}>
                <Row className="justify-content-center g-4">
                    <Col xs={12} md={4}>
                        <FeatureCard Icon={PlayCircleFill} title="Free Preview Videos" subtitle="Watch sample lectures from our expert teachers" />
                    </Col>
                    <Col xs={12} md={4}>
                        <FeatureCard Icon={CreditCard} title="No Credit Card Required" subtitle="Start learning immediately without any payment" />
                    </Col>
                    <Col xs={12} md={4}>
                        <FeatureCard Icon={ClockFill} title="Unlimited Access" subtitle="Access demo content anytime, anywhere" />
                    </Col>
                </Row>
            </div>

            {/* Demo Classes */}
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

            {/* Demo Video Modal */}
            {selectedCourse && (
                <Modal show={!!selectedCourse} onHide={closeDemoModal} size="lg" centered>
                    <Modal.Header closeButton style={{ backgroundColor: UI_COLORS.modalSuccess }} className="text-white">
                        <Modal.Title>{selectedCourse.title} - Free Demo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedCourse.videoLink ? (
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src={selectedCourse.videoLink}
                                    title={`${selectedCourse.title} Demo Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p>Video coming soon!</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDemoModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Login Required Modal */}
            <Modal show={showLoginPopup} onHide={() => setShowLoginPopup(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You must login to watch demo videos.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLoginPopup(false)}>Close</Button>
                    <Button variant="primary" onClick={() => window.location.href="/login"}>Go to Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DemoPage;
