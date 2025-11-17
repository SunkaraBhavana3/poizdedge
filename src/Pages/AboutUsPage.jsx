import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// NOTE: External imports for CSS and icons are removed to ensure compilation in isolated environments.

// --- UI Constants ---
const UI_COLORS = {
    primaryBlue: "#1E3A8A", // Deep Blue for PoizdEdge branding
    headerBlue: "#152A68",
    lightBackground: "#f8f9fb",
    cardBackground: "white",
    textDark: "#333",
    textMuted: "#666",
    cardBorder: "#e9ecef",
    accentLight: "#e6f2ff",
};

// --- Custom Icon Placeholder Component ---
const IconPlaceholder = ({ iconName, size = 24, style = {} }) => {
    // A simple mapping to provide basic text/symbol indicators based on the original icon name
    const symbolMap = {
        Globe2: '🌎', Eye: '👁️', EnvelopeFill: '📧', TelephoneFill: '📞', GeoAltFill: '📍',
        AwardFill: '🏆', BookFill: '📚', PeopleFill: '🤝', ChatQuoteFill: '💬', StarFill: '⭐',
        LightningChargeFill: '⚡', ShieldFill: '🛡️', Globe: '🌐', LightbulbFill: '💡',
        BookOpenFill: '📖', HandshakeFill: '🎯', Clipboard2CheckFill: '✅', HeartPulseFill: '❤️‍🩹'
    };
    const symbol = symbolMap[iconName] || '✨'; // Default symbol

    const defaultStyle = {
        fontSize: `${size}px`,
        lineHeight: 1,
        display: 'inline-block',
        minWidth: `${size}px`,
        textAlign: 'center',
    };

    return <span style={{ ...defaultStyle, ...style }}>{symbol}</span>;
};


// --- Data Structures (Updated for PoizdEdge/Life Sciences Focus) ---

const coreValuesData = [
    { iconName: "StarFill", title: "Excellence", description: "Setting the highest standards in clinical training and professional conduct." },
    { iconName: "LightningChargeFill", title: "Empowerment & Confidence", description: "Helping professionals rebuild self-belief and rediscover the purpose to excel." },
    { iconName: "ShieldFill", title: "Integrity", description: "Upholding honesty, transparency, and ethical conduct in all our processes." },
    { iconName: "Globe", title: "Inclusivity", description: "Providing equal opportunity for every learner, regardless of career gaps or background." },
    { iconName: "LightbulbFill", title: "Innovation", description: "Continuously evolving our curriculum and tools to match the dynamic life sciences industry." },
    { iconName: "BookOpenFill", title: "Career Clarity", description: "Nurturing a growth mindset, transforming uncertainty into a clear, focused career path." },
    { iconName: "HandshakeFill", title: "Practical Application", description: "Fostering teamwork and hands-on skills necessary for real-world clinical and research settings." },
];


const facultyData = [
    { name: "Dr. Alok Verma", role: "Clinical Research Mentor", details: "15+ Years in Drug Development\nPhD, CCRP Certified", initial: "A" },
    { name: "Ms. Neha Sinha", role: "Quality Assurance Expert", details: "10+ Years in Pharma QA/QC\nLead Auditor Certified", initial: "N" },
    { name: "Mr. Rohan Dixit", role: "Soft Skills & Interview Coach", details: "M.A. in Communications\n8+ Years Corporate Training", initial: "R" },
    { name: "Dr. Sandhya Rao", role: "Medical Writing Specialist", details: "PhD in Life Sciences\n12+ Years Regulatory Documentation", initial: "S" },
];

const achievementData = [
    { title: "90% Placement Success", description: "Graduates successfully placed in leading Pharma/Clinical Research Organizations." },
    { title: "Confidence Rebuilt", description: "Our unique soft skills program has restored confidence in hundreds of returning professionals." },
    { title: "Industry-Certified Tools", description: "Training provided in the latest clinical and research software used globally." },
    { title: "Lifetime Mentorship", description: "Continuous career support and guidance long after course completion." },
];

const contactData = [
    { iconName: "EnvelopeFill", title: "Email Us", details: ["info@poizdedge.com", "support@poizdedge.com"] },
    { iconName: "TelephoneFill", title: "Call/WhatsApp", details: ["+91 98765 43210 (India)", "Mon-Fri: 10 AM - 7 PM IST"] },
    { iconName: "GeoAltFill", title: "Training Hub (Online)", details: ["Global Access via Live Classes", "Personalized One-on-One Sessions"] },
];

// UPDATED for specialized services
const featuresData = [
    { iconName: "Clipboard2CheckFill", title: "Specialized Course Training", description: "Comprehensive, job-oriented training in clinical research tools and standards." },
    { iconName: "ChatQuoteFill", title: "Targeted Interview Coaching", description: "One-on-one sessions covering common industry questions and behavioral responses." },
    { iconName: "PeopleFill", title: "Soft Skills & Communication", description: "Master professional communication, presentation, and team collaboration skills." },
    { iconName: "HeartPulseFill", title: "Confidence & Motivation Boost", description: "Personalized mentorship designed to overcome career gaps and self-doubt." },
];

// --- Components (Unchanged logic, just updated UI colors) ---

const MissionVisionCard = ({ iconName, title, description }) => (
    <Card className="h-100 p-4 border-0 shadow-sm text-center" style={{ borderRadius: '10px' }}>
        <IconPlaceholder 
            iconName={iconName} 
            size={35} 
            className="mb-3" 
            style={{ color: UI_COLORS.primaryBlue }}
        />
        <h5 className="fw-bold" style={{ color: UI_COLORS.textDark }}>{title}</h5>
        <p style={{ color: UI_COLORS.textMuted }} className="small">{description}</p>
    </Card>
);

const FacultyCard = ({ name, role, details, initial }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        borderRadius: '15px',
        backgroundColor: 'transparent',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 1rem 3rem rgba(0,0,0,.175)' : '0 .5rem 1rem rgba(0,0,0,.15)'
    };

    return (
        <Card
            className="h-100 text-center border-0"
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="mx-auto mt-4 mb-3 d-flex justify-content-center align-items-center rounded-circle"
                style={{ width: '100px', height: '100px', backgroundColor: UI_COLORS.primaryBlue, color: 'white', fontSize: '3rem', fontWeight: 'bold' }}
            >
                {initial}
            </div>
            <Card.Body>
                <h5 className="fw-bold" style={{ color: UI_COLORS.textDark }}>{name}</h5>
                <p style={{ color: UI_COLORS.primaryBlue, fontWeight: 'bold', fontSize: '0.9rem' }}>{role}</p>
                <p style={{ color: UI_COLORS.textMuted, whiteSpace: 'pre-wrap' }} className="small">{details}</p>
            </Card.Body>
        </Card>
    );
};

const AchievementBox = ({ title, description }) => (
    <Card className="h-100 border-0 p-4 shadow-sm" style={{ borderRadius: '8px' }}>
        <h5 className="fw-bold mb-2" style={{ color: UI_COLORS.primaryBlue }}>{title}</h5>
        <p style={{ color: UI_COLORS.textMuted }} className="small">{description}</p>
    </Card>
);

const ContactCard = ({ iconName, title, details }) => (
    <Card className="h-100 text-center p-4 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
        <IconPlaceholder iconName={iconName} size={32} className="mb-3" style={{ color: UI_COLORS.primaryBlue }} />
        <h5 className="fw-bold mb-3" style={{ color: UI_COLORS.textDark }}>{title}</h5>
        {details.map((line, i) => (
            <p key={i} style={{ color: UI_COLORS.textMuted }} className="small mb-1">{line}</p>
        ))}
    </Card>
);

const FeatureCard = ({ iconName, title, description }) => (
    <Card className="h-100 p-4 border-0 shadow-sm" style={{ backgroundColor: UI_COLORS.cardBackground, borderRadius: '10px' }}>
        <div className="d-flex align-items-center mb-3">
            <div className="p-3 rounded-circle me-3" style={{ backgroundColor: UI_COLORS.accentLight }}>
                <IconPlaceholder iconName={iconName} size={24} style={{ color: UI_COLORS.headerBlue }} />
            </div>
            <h5 className="fw-bold mb-0" style={{ color: UI_COLORS.textDark }}>{title}</h5>
        </div>
        <p style={{ color: UI_COLORS.textMuted }} className="small mb-0">{description}</p>
    </Card>
);


// --- Main Page ---

const AboutUsPage = () => (
    <div style={{ backgroundColor: UI_COLORS.lightBackground }}>

        <header className="py-5 text-center" style={{ backgroundColor: UI_COLORS.headerBlue, color: "white" }}>
            <h5 className="fw-light">Welcome to The PoizdEdge Institute</h5>
            <h1 className="fw-bold">Your Partner in Clinical Career Transformation and Confidence</h1>
        </header>

        {/* Mission and Vision Section */}
        <Container className="py-5">
            <Row className="g-4 text-center justify-content-center">
                <Col md={6}>
                    <MissionVisionCard iconName="Globe2" title="Our Mission" description="Our mission is to empower aspiring and re-emerging professionals in the life sciences domain. We provide the knowledge, confidence, and practical skills needed to excel by bridging the gap between academic learning and industry expectations through hands-on training, soft skill development, and personalized interview preparation." />
                </Col>
                <Col md={6}>
                    <MissionVisionCard iconName="Eye" title="Our Vision" description="To be the leading global hub for clinical excellence and professional empowerment. We envision a community where every learner, regardless of background or career gap, gains the competence, confidence, and clarity required to thrive and drive innovation in the life sciences and healthcare industry worldwide." />
                </Col>
            </Row>
        </Container>

        {/* Why Choose Us Section (Features - The Friendly Value Proposition) */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-5" style={{ color: UI_COLORS.textDark }}>
                How We Get You **Job-Ready and Confident** 🚀
            </h2>
            <Row className="g-4">
                {featuresData.map((f, i) => (
                    <Col xs={12} md={6} lg={3} key={i}>
                        <FeatureCard {...f} />
                    </Col>
                ))}
            </Row>
        </Container>


        {/* Core Values Section */}
        <Container fluid className="py-5" style={{ backgroundColor: UI_COLORS.accentLight }}>
            <Container>
                <h2 className="text-center fw-bold mb-5" style={{ color: UI_COLORS.textDark }}>Our Core Values</h2>
                <Row className="g-4 justify-content-center">
                    {coreValuesData.map((v, i) => (
                        <Col xs={12} md={6} lg={4} key={i}>
                            <FeatureCard {...v} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>


        {/* Faculty Section */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4" style={{ color: UI_COLORS.textDark }}>Meet Our Industry Mentors</h2>
            <Row className="g-4">
                {facultyData.map((f, i) => (
                    <Col xs={6} md={3} key={i}><FacultyCard {...f} /></Col>
                ))}
            </Row>
        </Container>

        {/* Testimonial/Quote Section (Focusing on self-doubt/confidence) */}
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-5 text-center border-0 shadow-lg" style={{ borderRadius: '15px', backgroundColor: UI_COLORS.primaryBlue, color: 'white' }}>
                        <IconPlaceholder iconName="ChatQuoteFill" size={40} className="mx-auto mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                        <blockquote className="blockquote mb-0">
                            <p className="mb-4 lead fst-italic">
                                "We don't just teach the syllabus; we teach you how to believe in your potential. Whether you're a fresher or bouncing back from a career break, our mentorship is designed to replace self-doubt with **job-winning confidence**."
                            </p>
                            <footer className="blockquote-footer text-light">
                                <cite title="Source Title" className="fw-bold text-white">The PoizdEdge Founding Team</cite>
                            </footer>
                        </blockquote>
                    </Card>
                </Col>
            </Row>
        </Container>

        {/* Achievements Section */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4" style={{ color: UI_COLORS.textDark }}>Our Impact and Achievements</h2>
            <Row className="g-4">
                {achievementData.map((a, i) => (
                    <Col md={6} key={i}><AchievementBox {...a} /></Col>
                ))}
            </Row>
        </Container>

        {/* Contact Section */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4" style={{ color: UI_COLORS.textDark }}>Connect with Your Career Success Team</h2>
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