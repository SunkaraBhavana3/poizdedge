import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Globe2, Eye, Heart, EnvelopeFill, TelephoneFill, GeoAltFill
} from 'react-bootstrap-icons';

const UI_COLORS = {
  primaryBlue: "#007bff",
  headerBlue: "#0056b3",
  lightBackground: "#f4f7f9",
  cardBackground: "white",
  textDark: "#333",
  textMuted: "#666",
  cardBorder: "#e9ecef",
};

// --- Data Structures ---

const facultyData = [
  { name: "Dr. Rajesh Kumar", role: "Mathematics Expert", details: "Ph.D. in Mathematics\n15 years of teaching experience", initial: "R" },
  { name: "Prof. Meera Gupta", role: "Science Faculty", details: "M.Sc., B.Ed.\n12 years of teaching experience", initial: "M" },
  { name: "Mr. Amit Singh", role: "English Faculty", details: "M.A. in English\n10 years of teaching experience", initial: "A" },
  { name: "Dr. Priya Sharma", role: "Social Studies Expert", details: "Ph.D. in History\n14 years of teaching experience", initial: "P" },
];

const achievementData = [
  { title: "10,000+ Students", description: "We've helped over 10,000 students achieve their academic goals." },
  { title: "95% Success Rate", description: "Our students consistently achieve outstanding results." },
  { title: "Award-Winning Platform", description: `Recognized as the "Best Online Education Platform 2024".` },
  { title: "24/7 Support", description: "We provide support to students anytime they need help." },
];

const contactData = [
  { Icon: EnvelopeFill, title: "Email Us", details: ["info@edumaster.com", "support@edumaster.com"] },
  { Icon: TelephoneFill, title: "Call Us", details: ["+1 (555) 123-4567", "Mon-Sat: 9AM - 6PM"] },
  { Icon: GeoAltFill, title: "Visit Us", details: ["123 Education Street", "Learning City, LC 12345"] },
];

// --- Components ---

const MissionVisionCard = ({ Icon, title, description }) => (
  <Card className="h-100 p-4 border-0 shadow-sm text-center" style={{ borderRadius: '10px' }}>
    <Icon size={35} className="mb-3 p-2 rounded-circle" style={{ color: UI_COLORS.primaryBlue, border: `2px solid ${UI_COLORS.primaryBlue}` }} />
    <h5 className="fw-bold" style={{ color: UI_COLORS.textDark }}>{title}</h5>
    <p className="text-muted small">{description}</p>
  </Card>
);

const FacultyCard = ({ name, role, details, initial }) => (
  <Card className="h-100 text-center border-0">
    <div 
      className="mx-auto mt-4 mb-3 d-flex justify-content-center align-items-center rounded-circle"
      style={{ width: '100px', height: '100px', backgroundColor: 'rgba(0, 123, 255, 0.15)', color: UI_COLORS.primaryBlue, fontSize: '3rem', fontWeight: 'bold' }}
    >
      {initial}
    </div>
    <Card.Body>
      <h5 className="fw-bold">{name}</h5>
      <p style={{ color: UI_COLORS.primaryBlue, fontWeight: 'bold', fontSize: '0.9rem' }}>{role}</p>
      <p className="text-muted small" style={{ whiteSpace: 'pre-wrap' }}>{details}</p>
    </Card.Body>
  </Card>
);

const AchievementBox = ({ title, description }) => (
  <Card className="h-100 border-0 p-4 shadow-sm" style={{ borderRadius: '8px' }}>
    <h5 className="fw-bold mb-2" style={{ color: UI_COLORS.primaryBlue }}>{title}</h5>
    <p className="text-muted small">{description}</p>
  </Card>
);

const ContactCard = ({ Icon, title, details }) => (
  <Card className="h-100 text-center p-4 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
    <Icon size={32} className="mb-3" style={{ color: UI_COLORS.primaryBlue }} />
    <h5 className="fw-bold mb-3">{title}</h5>
    {details.map((line, i) => <p key={i} className="text-muted small mb-1">{line}</p>)}
  </Card>
);

// --- Main Page ---

const AboutUsPage = () => (
  <div style={{ backgroundColor: UI_COLORS.lightBackground }}>
    
    <header className="py-5 text-center" style={{ backgroundColor: UI_COLORS.headerBlue, color: "white" }}>
      <h5 className="fw-light">About EduMaster Academy</h5>
      <h1 className="fw-bold">Empowering Students Through Quality Online Education</h1>
    </header>

    <Container className="py-5">
      <Row className="g-4 text-center">
        <Col md={4}><MissionVisionCard Icon={Globe2} title="Our Mission" description="To provide accessible and quality education to every student." /></Col>
        <Col md={4}><MissionVisionCard Icon={Eye} title="Our Vision" description="To become the most trusted digital learning community." /></Col>
        <Col md={4}><MissionVisionCard Icon={Heart} title="Our Values" description="Excellence, Innovation, Integrity, Student First." /></Col>
      </Row>
    </Container>

    <Container className="py-5 bg-white">
      <h2 className="text-center fw-bold mb-4">Meet Our Expert Faculty</h2>
      <Row className="g-4">
        {facultyData.map((f, i) => (
          <Col xs={6} md={3} key={i}><FacultyCard {...f} /></Col>
        ))}
      </Row>
    </Container>

    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Our Achievements</h2>
      <Row className="g-4">
        {achievementData.map((a, i) => (
          <Col md={6} key={i}><AchievementBox {...a} /></Col>
        ))}
      </Row>
    </Container>

    <Container className="py-5">
      <h2 className="text-center fw-bold mb-4">Get in Touch</h2>
      <Row className="g-4 justify-content-center">
        {contactData.map((contact, i) => (
          <Col xs={12} md={4} key={i}>
            <ContactCard {...contact} />
          </Col>
        ))}
      </Row>
    </Container>

  </div>
);

export default AboutUsPage;
