import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    PhoneFill, EnvelopeFill, GeoAltFill, ClockFill, Whatsapp, SendFill, Link45deg 
} from 'react-bootstrap-icons'; // Using React-Bootstrap Icons

// Define brand colors based on the screenshots
const UI_COLORS = {
    headerBlue: "#0D47A1", // Darker blue for the main header background
    lightBackground: "#f4f7f9", // Light background for general sections
    cardBackground: "white",
    textDark: "#333",
    textMuted: "#666",
    primaryBlue: "#007bff", // Blue for links/icons
    whatsAppGreen: "#25D366", // WhatsApp brand green
    whatsAppLight: "#e6ffed", // Light green background for WhatsApp box
};

// --- Reusable Icon/Link Component ---
const ContactItem = ({ Icon, title, linkText, linkHref, children }) => (
    <div className="d-flex mb-4">
        <Icon size={20} className="me-3 p-1 rounded-circle" style={{ color: UI_COLORS.primaryBlue, backgroundColor: 'rgba(0, 123, 255, 0.1)' }} />
        <div>
            <p className="mb-0 fw-bold small">{title}</p>
            <p className="mb-0 small" style={{ color: UI_COLORS.textDark }}>{children}</p>
            {linkText && (
                <a href={linkHref} className="small" style={{ color: UI_COLORS.primaryBlue }}>
                    {linkText}
                </a>
            )}
        </div>
    </div>
);

// --- Main Contact Us Page Component ---

const ContactUsPage = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation/placeholder for demonstration
        alert("Message Sent! We will respond to you soon.");
        e.target.reset();
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: UI_COLORS.lightBackground }}>
            
            {/* 1. Header Section (Top Blue Bar) */}
            <header className="py-5" style={{ backgroundColor: UI_COLORS.headerBlue, color: 'white' }}>
                <Container className="text-center">
                    <h4 className="mb-2 fw-bold">Get In Touch</h4>
                    <p className="lead" style={{ opacity: 0.9 }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </Container>
            </header>

            {/* 2. Contact Form & Info Section */}
            <Container className="py-5">
                <Row className="g-4">
                    {/* Left Column: Contact Information & WhatsApp Support */}
                    <Col lg={4}>
                        <Card className="p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: UI_COLORS.cardBackground }}>
                            <Card.Body>
                                <h5 className="fw-bold mb-1" style={{ color: UI_COLORS.textDark }}>Contact Information</h5>
                                <p className="text-muted small mb-4">Reach out to us through any of these channels</p>

                                {/* Contact Items */}
                                <ContactItem Icon={PhoneFill} title="Phone" linkText="Call us now" linkHref="tel:+15551234567">
                                    +1 (555) 123-4567
                                </ContactItem>
                                
                                <ContactItem Icon={EnvelopeFill} title="Email" linkText="Send an email" linkHref="mailto:info@edumaster.com">
                                poizdedgeinstitute@gmail.com
                                </ContactItem>
                                     <ContactItem Icon={EnvelopeFill} title="Technical Issues" linkText="Send an email" linkHref="mailto:info@edumaster.com">
                                   customercarepoizdedge@gmail.com
                                </ContactItem>
                                
                                <ContactItem Icon={GeoAltFill} title="Address">
                                    123 Education Street, Learning City, LC 12345
                                </ContactItem>

                                <ContactItem Icon={ClockFill} title="Office Hours">
                                    Monday - Friday: 9:00 AM - 6:00 PM
                                </ContactItem>
                            </Card.Body>
                        </Card>

                        {/* WhatsApp Support Box */}
                        <Card className="p-4 border-0 shadow-sm" style={{ backgroundColor: UI_COLORS.whatsAppLight, borderColor: UI_COLORS.whatsAppGreen }}>
                            <Card.Body>
                                <div className="d-flex align-items-center mb-3">
                                    <Whatsapp size={24} style={{ color: UI_COLORS.whatsAppGreen, marginRight: '10px' }} />
                                    <h5 className="fw-bold mb-0" style={{ color: UI_COLORS.textDark }}>WhatsApp Support</h5>
                                </div>
                                <p className="text-muted small mb-3">Get instant responses on WhatsApp</p>

                                {/* Chat Button */}
                                <Button 
                                    variant="success" 
                                    className="w-100 fw-bold d-flex align-items-center justify-content-center mb-2"
                                    style={{ backgroundColor: UI_COLORS.whatsAppGreen, borderColor: UI_COLORS.whatsAppGreen }}
                                    href="https://wa.me/15551234567" // Replace with actual WhatsApp link
                                    target="_blank"
                                >
                                    <Whatsapp size={18} className="me-2" />
                                    Chat with us on WhatsApp
                                </Button>
                                <div className="text-center small text-muted my-2">OR</div>
                                {/* Join Group Button */}
                                <Button 
                                    variant="outline-success" 
                                    className="w-100 fw-bold d-flex align-items-center justify-content-center"
                                    style={{ borderColor: UI_COLORS.whatsAppGreen, color: UI_COLORS.whatsAppGreen, backgroundColor: 'white' }}
                                    href="#" // Placeholder for group link
                                >
                                    <Link45deg size={18} className="me-2" />
                                    Join WhatsApp Group for Updates
                                </Button>
                                <p className="text-center small mt-2" style={{ color: UI_COLORS.textMuted }}>
                                    Stay updated with class schedules, announcements, and study materials
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right Column: Send a Message Form */}
                    <Col lg={8}>
                        <Card className="p-4 border-0 shadow-sm h-100" style={{ backgroundColor: UI_COLORS.cardBackground }}>
                            <Card.Body>
                                <h5 className="fw-bold mb-1" style={{ color: UI_COLORS.textDark }}>Send us a Message</h5>
                                <p className="text-muted small mb-4">Fill out the form below and we'll get back to you shortly</p>

                                <Form onSubmit={handleSubmit}>
                                    {/* Full Name */}
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label className="fw-bold small">Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Your name" required />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="fw-bold small">Email</Form.Label>
                                        <Form.Control type="email" placeholder="your.email@example.com" required />
                                    </Form.Group>

                                    {/* Phone Number */}
                                    <Form.Group className="mb-3" controlId="formPhone">
                                        <Form.Label className="fw-bold small">Phone Number</Form.Label>
                                        <Form.Control type="tel" placeholder="+1 (555) 123-4567" />
                                    </Form.Group>

                                    {/* Message */}
                                    <Form.Group className="mb-4" controlId="formMessage">
                                        <Form.Label className="fw-bold small">Message</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="w-100 fw-bold d-flex align-items-center justify-content-center"
                                        style={{ backgroundColor: UI_COLORS.primaryBlue, borderColor: UI_COLORS.primaryBlue }}
                                    >
                                        <SendFill size={14} className="me-2" />
                                        Send Message
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* 3. Find Us / Map Section (Screenshot 2) */}
            <Container className="py-5">
                <h2 className="fw-bold mb-3" style={{ color: UI_COLORS.textDark }}>Find Us</h2>
                <p className="text-muted lead mb-4">Visit our office for in-person consultations</p>
                
                <Card className="p-3 border-0 shadow-sm" style={{ backgroundColor: UI_COLORS.cardBackground }}>
                    {/* Placeholder for Google Map Embed */}
                    <div 
                        className="rounded mb-3"
                        style={{ 
                            height: '400px', 
                            backgroundColor: '#e0e0e0', // Gray background for map area
                            overflow: 'hidden' 
                        }}
                    >
                        {/* In a real application, you would embed a Google Maps iframe here, 
                            using the address: 123 Education Street, Learning City, LC 12345
                        */}
                        <img 
                            src="https://via.placeholder.com/1000x400?text=Placeholder+Map+Embed" 
                            alt="Map showing office location" 
                            className="w-100 h-100" 
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    
                    {/* Address and Directions */}
                    <div className="d-flex align-items-center mb-2">
                        <GeoAltFill size={20} className="me-2" style={{ color: UI_COLORS.primaryBlue }} />
                        <span className="fw-bold" style={{ color: UI_COLORS.textDark }}>
                            123 Education Street, Learning City, LC 12345
                        </span>
                    </div>
                    <a href="#" className="mb-3 d-inline-block" style={{ color: UI_COLORS.primaryBlue }}>
                        Get Directions &rarr;
                    </a>
                </Card>
            </Container>
        </div>
    );
};

export default ContactUsPage;