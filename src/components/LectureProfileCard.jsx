// components/LectureProfileCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaGlobe, FaTwitter, FaLinkedin, FaUserTie } from 'react-icons/fa';

const LectureProfileCard = ({ instructorName, shortBio, profileImage, socials }) => (
    <Card className="shadow-sm mb-4 border-0 p-3">
        <div className="d-flex align-items-center mb-3">
            {/* Mock Profile Image */}
            <FaUserTie size={40} className="me-3 text-primary" /> 
            <div>
                <h5 className="mb-0 fw-bold">{instructorName || "The Instructor"}</h5>
                <p className="small text-muted mb-0">Course Creator & Expert</p>
            </div>
        </div>
        <p className="small text-muted">{shortBio || "A passionate educator dedicated to helping you master this topic."}</p>
        <div className="d-flex gap-2">
            {socials?.linkedin && <Button variant="outline-secondary" size="sm" href={socials.linkedin}><FaLinkedin /></Button>}
            {socials?.twitter && <Button variant="outline-secondary" size="sm" href={socials.twitter}><FaTwitter /></Button>}
            <Button variant="outline-secondary" size="sm"><FaGlobe /></Button>
        </div>
    </Card>
);

export default LectureProfileCard;