import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import image from "../assets/1768544850194.jpg";

// --- UI Constants ---
const UI_COLORS = {
    primaryBlue: "#1E3A8A", 
    headerBlue: "#152A68",
    lightBackground: "#f8f9fb",
    cardBackground: "white",
    textDark: "#333",
    textMuted: "#666",
    cardBorder: "#e9ecef",
    accentLight: "#e6f2ff",
    verifiedGreen: "#10B981",
    studyGold: "#F59E0B"
};

// --- Custom Icon Placeholder Component ---
const IconPlaceholder = ({ iconName, size = 24, style = {} }) => {
    const symbolMap = {
        Globe2: '🌎', Eye: '👁️', EnvelopeFill: '📧', TelephoneFill: '📞', GeoAltFill: '📍',
        AwardFill: '🏆', BookFill: '📚', PeopleFill: '🤝', ChatQuoteFill: '💬', StarFill: '⭐',
        LightningChargeFill: '⚡', ShieldFill: '🛡️', Globe: '🌐', LightbulbFill: '💡',
        BookOpenFill: '📖', HandshakeFill: '🎯', Clipboard2CheckFill: '✅', HeartPulseFill: '❤️‍🩹',
        Capsule: '💊', Activity: '📈', Microscope: '🔬'
    };
    const symbol = symbolMap[iconName] || '✨';
    const defaultStyle = {
        fontSize: `${size}px`,
        lineHeight: 1,
        display: 'inline-block',
        minWidth: `${size}px`,
        textAlign: 'center',
    };
    return <span style={{ ...defaultStyle, ...style }}>{symbol}</span>;
};

// --- Data Structures ---
const coreValuesData = [
    { iconName: "StarFill", title: "Excellence", description: "Setting the highest standards in clinical training and professional conduct." },
    { iconName: "LightningChargeFill", title: "Empowerment & Confidence", description: "Helping professionals rebuild self-belief and rediscover the purpose to excel." },
    { iconName: "ShieldFill", title: "Integrity", description: "Upholding honesty, transparency, and ethical conduct in all our processes." },
    { iconName: "Globe", title: "Inclusivity", description: "Providing equal opportunity for every learner, regardless of career gaps." },
    { iconName: "LightbulbFill", title: "Innovation", description: "Evolving our curriculum to match the dynamic life sciences industry." },
    { iconName: "BookOpenFill", title: "Career Clarity", description: "Transforming uncertainty into a clear, focused career path." },
    { iconName: "HandshakeFill", title: "Practical Application", description: "Fostering teamwork and hands-on skills for real-world clinical settings." },
];

const facultyData = [
    { 
        name: "Bhanu Melvin", 
        role: "Lead Industry Trainer & Clinical Research Expert", 
        exp: "13+ Years",
        details: "A Lean Six Sigma Black Belt with 13+ years of industry expertise, Bhanu has mentored over 2,000 professionals. Known for her student-centric and friendly approach, she simplifies complex subjects like Regulatory Affairs and SAS Programming.",
        image: image, 
        initial: "B" 
    },
    {
        name: "K. Preethi Sagar",
        role: "Academia & Pharmacology",
        exp: "9+ Years",
        details: "A seasoned educator with 9 years of experience and a Master’s in Pharmacology, Preethi Sagar provides the expert foundational training essential for every student at the PoizdEdge Institute.",
        image: null, 
        initial: "P"
    },
    { 
        name: "Dr. Sasya Ganeshan", 
         role: "Global Regulatory Expert", 
         exp: "15+ Years",
         details: "Dr. Ganeshan brings a wealth of knowledge from his Doctorate in Microbiology and 15+ years in Medical Devices. Known for his infectious enthusiasm and patient teaching.",
         image: null, 
         initial: "S" 
     },
    { 
        name: "Cassia", 
        role: "Senior Clinical Data Management Professional", 
        exp: "9+ Years",
        details: "A specialist in Veeva and Inform platforms, Cassia brings 9+ years of end-to-end CDM expertise. She is recognized for her approachable and supportive mentoring style.",
        image: null, 
        initial: "C" 
    },
    { 
        name: "Anila K N", 
        role: "Clinical Research & Hepatology ", 
        exp: "10+ Years",
        details: "A University Gold Medalist and seasoned Doctoral Researcher. Currently spearheading advanced research in liver transplantation and bile acid pathways.",
        image: null, 
        initial: "A" 
    }
];

const featuresData = [
    { iconName: "Clipboard2CheckFill", title: "Specialized Course Training", description: "Comprehensive, job-oriented training in clinical research tools and standards." },
    { iconName: "ChatQuoteFill", title: "Targeted Interview Coaching", description: "One-on-one sessions covering common industry questions and behavioral responses." },
    { iconName: "PeopleFill", title: "Soft Skills & Communication", description: "Master professional communication, presentation, and team collaboration skills." },
    { iconName: "HeartPulseFill", title: "Confidence & Motivation Boost", description: "Personalized mentorship designed to overcome career gaps and self-doubt." },
];

const achievementData = [
    { title: "90% Placement Success", description: "Graduates successfully placed in leading Pharma/Clinical Research Organizations." },
    { title: "Confidence Rebuilt", description: "Our unique soft skills program has restored confidence in hundreds of professionals." },
    { title: "Industry-Certified Tools", description: "Training provided in the latest clinical and research software used globally." },
    { title: "Lifetime Mentorship", description: "Continuous career support and guidance long after course completion." },
];

const contactData = [
    { iconName: "EnvelopeFill", title: "Email Us", details: ["poizdedgeinstitute@gmail.com", "customercarepoizdedge@gmail.com"] },
    { iconName: "TelephoneFill", title: "Call/WhatsApp", details: ["+91 87140 40888 (India)", "Mon-Fri: 10 AM - 7 PM IST"] },
    { iconName: "GeoAltFill", title: "Training Hub (Online)", details: ["Global Access via Live Classes", "Personalized One-on-One Sessions"] },
];

// --- Sub-Components ---

const FacultyCard = ({ name, role, details, image, initial, exp }) => {
    const [hover, setHover] = useState(false);
    return (
        <Card onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="border-0 h-100 shadow-sm" style={{ borderRadius: '24px', overflow: 'hidden', transition: '0.3s', transform: hover ? 'translateY(-10px)' : 'none' }}>
            <div style={{ height: '90px', background: `linear-gradient(135deg, ${UI_COLORS.headerBlue}, ${UI_COLORS.primaryBlue})` }} />
            <div className="px-4 text-center" style={{ marginTop: '-60px' }}>
                <div className="position-relative d-inline-block mb-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '110px', height: '110px', border: '5px solid white', background: '#F3F4F6', overflow: 'hidden' }}>
                        {image ? <img src={image} alt={name} className="w-100 h-100 object-fit-cover" /> : <span style={{ fontSize: '2.5rem', fontWeight: '800', color: UI_COLORS.primaryBlue }}>{initial}</span>}
                    </div>
                    <div className="position-absolute shadow-sm" style={{ bottom: '8px', right: '5px', width: '24px', height: '24px', backgroundColor: UI_COLORS.verifiedGreen, border: '2px solid white', borderRadius: '50%', color: 'white', fontSize: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✓</div>
                </div>
                <div className="pb-4">
                    <h5 className="fw-bold mb-1">{name}</h5>
                    <div className="mb-3">
                        <Badge bg="none" style={{ backgroundColor: UI_COLORS.accentLight, color: UI_COLORS.primaryBlue }}>{role}</Badge> 
                        <span className="small fw-bold text-muted ms-2">{exp}</span>
                    </div>
                    <p className="text-muted small mb-4" style={{ minHeight: '60px' }}>{details}</p>
                </div>
            </div>
        </Card>
    );
};

const InfoCard = ({ iconName, title, description, whiteBg = true }) => (
    <Card className="h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: whiteBg ? 'white' : UI_COLORS.accentLight }}>
        <div className="d-flex align-items-center mb-3">
            <div className="p-3 rounded-circle me-3" style={{ backgroundColor: whiteBg ? UI_COLORS.accentLight : 'white' }}>
                <IconPlaceholder iconName={iconName} size={24} style={{ color: UI_COLORS.primaryBlue }} />
            </div>
            <h6 className="fw-bold mb-0" style={{ color: UI_COLORS.textDark }}>{title}</h6>
        </div>
        <p className="text-muted small mb-0">{description}</p>
    </Card>
);

// --- NEW COMPONENT: Pharmacology Education ---
const PharmacologyModule = () => (
    <div style={{ backgroundColor: 'white', borderTop: `1px solid ${UI_COLORS.cardBorder}` }}>
        <Container className="py-5">
            <div className="text-center mb-5">
                <Badge bg="info" className="mb-2 px-3 py-2 text-uppercase" style={{ letterSpacing: '1px' }}>Academic Spotlight</Badge>
                <h2 className="fw-bold" style={{ color: UI_COLORS.headerBlue }}>Introduction to Pharmacology & Clinical Research</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: '800px' }}>
                    Pharmacology forms the scientific foundation of drug development and clinical research. Understanding drug interactions is essential for patient safety and innovative healthcare outcomes.
                </p>
            </div>

            <Row className="g-4 mb-5">
                <Col lg={12}>
                    <Card className="p-4 border-0 shadow-sm" style={{ backgroundColor: UI_COLORS.accentLight, borderRadius: '15px' }}>
                        <Row className="align-items-center">
                            <Col md={1} className="text-center d-none d-md-block">
                                <IconPlaceholder iconName="Microscope" size={40} style={{ color: UI_COLORS.primaryBlue }} />
                            </Col>
                            <Col md={11}>
                                <h5 className="fw-bold mb-2">What is Pharmacology?</h5>
                                <p className="mb-0 text-muted">
                                    It is the branch of biomedical science that studies how drugs interact with living organisms. It combines knowledge from biology, chemistry, physiology, and medicine to explain how medications produce therapeutic effects.
                                </p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                
                <Col md={6}>
                    <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>
                        <div className="d-flex align-items-center mb-3">
                            <div className="me-3 p-3 rounded-circle" style={{ background: '#E0E7FF' }}><IconPlaceholder iconName="Capsule" size={24} /></div>
                            <h5 className="fw-bold mb-0">1. Pharmacokinetics (PK)</h5>
                        </div>
                        <p className="small text-muted mb-3">Describes <strong>how the body affects a drug</strong>. It includes the crucial ADME processes:</p>
                        <ListGroup variant="flush" className="small">
                            <ListGroup.Item className="border-0 px-0"><strong>Absorption:</strong> How the drug enters the bloodstream.</ListGroup.Item>
                            <ListGroup.Item className="border-0 px-0"><strong>Distribution:</strong> How it spreads through tissues.</ListGroup.Item>
                            <ListGroup.Item className="border-0 px-0"><strong>Metabolism:</strong> How it's broken down (mainly in the liver).</ListGroup.Item>
                            <ListGroup.Item className="border-0 px-0"><strong>Excretion:</strong> How it leaves the body.</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="h-100 border-0 shadow-sm p-4" style={{ borderRadius: '20px' }}>
                        <div className="d-flex align-items-center mb-3">
                            <div className="me-3 p-3 rounded-circle" style={{ background: '#FEF3C7' }}><IconPlaceholder iconName="Activity" size={24} /></div>
                            <h5 className="fw-bold mb-0">2. Pharmacodynamics (PD)</h5>
                        </div>
                        <p className="small text-muted mb-3">Explains <strong>how the drug affects the body</strong>. Core areas of study include:</p>
                        <ul className="small text-muted">
                            <li className="mb-2">Molecular mechanism of action</li>
                            <li className="mb-2">Receptor interactions and binding</li>
                            <li className="mb-2">Dose-response relationships</li>
                            <li>Therapeutic vs. toxic effects of drugs</li>
                        </ul>
                    </Card>
                </Col>
            </Row>

            <div className="py-4 px-5 rounded-4" style={{ background: UI_COLORS.headerBlue, color: 'white' }}>
                <h4 className="fw-bold mb-4 text-center">Importance in Clinical Trials</h4>
                <Row className="g-4">
                    {[
                        { t: "Dose Selection", d: "Determining appropriate levels to avoid toxicity." },
                        { t: "Mechanism of Action", d: "Evaluating if the drug produces the expected effect." },
                        { t: "Trial Protocol", d: "Designing dosing schedules and monitoring parameters." },
                        { t: "Regulatory Support", d: "Providing data for FDA, EMA, and CDSCO approval." }
                    ].map((item, idx) => (
                        <Col key={idx} md={3} className="text-center">
                            <h6 className="fw-bold mb-2" style={{ color: '#93C5FD' }}>{item.t}</h6>
                            <p className="small mb-0" style={{ opacity: 0.8 }}>{item.d}</p>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    </div>
);

// --- Main Page ---

const AboutUsPage = () => (
    <div style={{ backgroundColor: UI_COLORS.lightBackground, paddingTop: '65px' }}>
        <header className="py-5 text-center" style={{ backgroundColor: UI_COLORS.headerBlue, color: "white" }}>
            <Container className="py-4">
                <h5 className="fw-light mb-2">Welcome to The Poizdedge Institute</h5>
                <h1 className="fw-bold">Your Partner in Clinical Career Transformation and Confidence</h1>
            </Container>
        </header>

        {/* Mission/Vision */}
        <Container className="py-5">
            <Row className="g-4 text-center justify-content-center">
                <Col md={6}>
                    <Card className="h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <IconPlaceholder iconName="Globe2" size={35} className="mb-3" style={{ color: UI_COLORS.primaryBlue }} />
                        <h5 className="fw-bold">Our Mission</h5>
                        <p className="text-muted small">Empowering life sciences professionals with knowledge and confidence to bridge the gap between academic learning and industry expectations.</p>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="h-100 p-4 border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                        <IconPlaceholder iconName="Eye" size={35} className="mb-3" style={{ color: UI_COLORS.primaryBlue }} />
                        <h5 className="fw-bold">Our Vision</h5>
                        <p className="text-muted small">To be the leading global hub for clinical excellence, ensuring every learner thrives regardless of their background or career gap.</p>
                    </Card>
                </Col>
            </Row>
        </Container>

        {/* NEW PHARMACOLOGY SECTION ADDED HERE */}
        <PharmacologyModule />

        {/* Why Choose Us */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-5">How We Get You Job-Ready 🚀</h2>
            <Row className="g-4">
                {featuresData.map((f, i) => (
                    <Col xs={12} md={6} lg={3} key={i}>
                        <InfoCard {...f} whiteBg={true} />
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
                            <InfoCard {...v} whiteBg={true} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>

        {/* Mentor Section */}
        <Container id="faculty" className="py-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold mb-2">Meet Our Industry Mentors</h2>
                <div style={{ width: '60px', height: '4px', backgroundColor: UI_COLORS.primaryBlue, margin: '0 auto' }}></div>
            </div>
            <Row className="g-5 justify-content-center">
                {facultyData.map((f, i) => (
                    <Col key={i} xs={12} md={6} lg={6} className="d-flex justify-content-center">
                        <div style={{ width: '100%', maxWidth: '450px' }}>
                            <FacultyCard {...f} />
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>

        {/* Founding Team Quote */}
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="p-5 text-center border-0 shadow-lg" style={{ borderRadius: '15px', backgroundColor: UI_COLORS.primaryBlue, color: 'white' }}>
                        <IconPlaceholder iconName="ChatQuoteFill" size={40} className="mx-auto mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                        <blockquote className="blockquote mb-0">
                            <p className="mb-4 lead fst-italic">
                                "We don't just teach the syllabus; we teach you how to believe in your potential. Whether you're a fresher or bouncing back from a career break, our mentorship replaces self-doubt with job-winning confidence."
                            </p>
                            <footer className="blockquote-footer text-light">
                                <cite className="fw-bold text-white">The Poizdedge Founding Team</cite>
                            </footer>
                        </blockquote>
                    </Card>
                </Col>
            </Row>
        </Container>

        {/* Impact/Achievements */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4">Our Impact and Achievements</h2>
            <Row className="g-4">
                {achievementData.map((a, i) => (
                    <Col md={6} lg={3} key={i}>
                        <Card className="h-100 border-0 p-4 shadow-sm" style={{ borderRadius: '8px' }}>
                            <h5 className="fw-bold mb-2" style={{ color: UI_COLORS.primaryBlue }}>{a.title}</h5>
                            <p className="text-muted small mb-0">{a.description}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

        {/* Contact Section */}
        <Container className="py-5">
            <h2 className="text-center fw-bold mb-4">Connect with Your Team</h2>
            <Row className="g-4 justify-content-center">
                {contactData.map((contact, i) => (
                    <Col xs={12} md={4} key={i}>
                        <Card className="h-100 text-center p-4 border-0 shadow-sm" style={{ borderRadius: '10px' }}>
                            <IconPlaceholder iconName={contact.iconName} size={32} className="mb-3" style={{ color: UI_COLORS.primaryBlue }} />
                            <h5 className="fw-bold mb-3">{contact.title}</h5>
                            {contact.details.map((line, idx) => <p key={idx} className="text-muted small mb-1">{line}</p>)}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
);

export default AboutUsPage;
