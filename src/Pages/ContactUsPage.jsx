import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    PhoneFill, EnvelopeFill, GeoAltFill, ClockFill, Whatsapp, SendFill, Link45deg 
} from 'react-bootstrap-icons';

// Define brand colors
const UI_COLORS = {
    headerBlue: "#0D47A1",
    lightBackground: "#f4f7f9",
    cardBackground: "white",
    textDark: "#333",
    textMuted: "#666",
    primaryBlue: "#007bff",
    whatsAppGreen: "#25D366",
    whatsAppLight: "#e6ffed",
};

// Reusable Contact Item
const ContactItem = ({ Icon, title, linkText, linkHref, children }) => (
    <div className="d-flex mb-4">
        <Icon
            size={20}
            className="me-3 p-1 rounded-circle"
            style={{ color: UI_COLORS.primaryBlue, backgroundColor: 'rgba(0, 123, 255, 0.1)' }}
        />
        <div>
            <p className="mb-0 fw-bold small">{title}</p>
            <p className="mb-0 small" style={{ color: UI_COLORS.textDark }}>
                {children}
            </p>
            {linkText && (
                <a href={linkHref} className="small" style={{ color: UI_COLORS.primaryBlue }}>
                    {linkText}
                </a>
            )}
        </div>
    </div>
);

const ContactUsPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://poizdedgebackend.onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Message Sent! We will respond to you soon.");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
            } else {
                alert(data.message || "Failed to send message");
            }
        } catch (error) {
            alert("Server error. Please try again later.");
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: UI_COLORS.lightBackground , paddingTop:'65px'}}>

            {/* Header */}
            <header className="py-5" style={{ backgroundColor: UI_COLORS.headerBlue, color: 'white' }}>
                <Container className="text-center">
                    <h4 className="mb-2 fw-bold">Get In Touch</h4>
                    <p className="lead" style={{ opacity: 0.9 }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </Container>
            </header>

            {/* Main Section */}
            <Container className="py-5">
                <Row className="g-4">

                    {/* Contact Info */}
                    <Col lg={4}>
                        <Card className="p-4 border-0 shadow-sm mb-4">
                            <Card.Body>
                                <h5 className="fw-bold mb-1">Contact Information</h5>
                                <p className="text-muted small mb-4">
                                    Reach out to us through any of these channels
                                </p>

                                <ContactItem
                                    Icon={PhoneFill}
                                    title="Phone"
                                    linkText="Call us now"
                                    linkHref="tel:+15551234567"
                                >
                                    <a href="tel:+15551234567" style={{ color: UI_COLORS.textDark }}>
                                        +91 87140 40888
                                    </a>
                                </ContactItem>

                                <ContactItem
                                    Icon={EnvelopeFill}
                                    title="Email"
                                    linkText="Send an email"
                                    linkHref="mailto:poizdedgeinstitute@gmail.com"
                                >
                                    <a href="mailto:poizdedgeinstitute@gmail.com" style={{ color: UI_COLORS.textDark }}>
                                        poizdedgeinstitute@gmail.com
                                    </a>
                                </ContactItem>

                                <ContactItem
                                    Icon={EnvelopeFill}
                                    title="Technical Issues"
                                    linkText="Send an email"
                                    linkHref="mailto:customercarepoizdedge@gmail.com"
                                >
                                    <a href="mailto:customercarepoizdedge@gmail.com" style={{ color: UI_COLORS.textDark }}>
                                        customercarepoizdedge@gmail.com
                                    </a>
                                </ContactItem>

                                <ContactItem Icon={GeoAltFill} title="Address">
                                    Trivandrum, Kerala, Pin 695301
                                </ContactItem>

                                <ContactItem Icon={ClockFill} title="Office Hours">
                                    Monday - Saturday: 9:00 AM - 6:00 PM
                                </ContactItem>
                            </Card.Body>
                        </Card>

                    {/* WhatsApp */}
<Card className="p-4 border-0 shadow-sm" style={{ backgroundColor: UI_COLORS.whatsAppLight }}>
  <Card.Body>
    <div className="d-flex align-items-center mb-3">
      <Whatsapp size={24} style={{ color: UI_COLORS.whatsAppGreen }} className="me-2" />
      <h5 className="fw-bold mb-0">WhatsApp Support</h5>
    </div>

    {/* Chat Button */}
    <Button
      className="w-100 fw-bold mb-2"
      style={{ backgroundColor: UI_COLORS.whatsAppGreen, border: "none" }}
      href="https://wa.me/918714040888"
      target="_blank"
    >
      <Whatsapp size={18} className="me-2" />
      Chat with us on WhatsApp
    </Button>

    <center className="my-2"><b>or</b></center>

    {/* Join Group Button */}
    <Button
      variant="outline-success"
      className="w-100 fw-bold"
      href="https://whatsapp.com/channel/0029Vb7d4yYBadmQsdZg160b"
      target="_blank"
    >
      <Link45deg size={18} className="me-2" />
      Join WhatsApp Group for Updates
    </Button>

  </Card.Body>
</Card>

                    </Col>

                    {/* Contact Form */}
                    <Col lg={8}>
                        <Card className="p-4 border-0 shadow-sm h-100">
                            <Card.Body>
                                <h5 className="fw-bold mb-1">Send us a Message</h5>
                                <p className="text-muted small mb-4">
                                    Fill out the form below and we'll get back to you shortly
                                </p>

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold small">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold small">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="your.email@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold small">Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-bold small">Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="message"
                                            placeholder="How can we help you?"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100 fw-bold"
                                        style={{ backgroundColor: UI_COLORS.primaryBlue }}
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
        </div>
    );
};

export default ContactUsPage;

