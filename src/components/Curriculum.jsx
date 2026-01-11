// components/Curriculum.js

import React, { useState } from 'react';
import { Card, ListGroup, Collapse } from 'react-bootstrap';
import { FaLock, FaCheckCircle, FaChevronRight, FaPlayCircle, FaFileAlt, FaLightbulb, FaChevronDown } from 'react-icons/fa';

const Curriculum = ({ modules, unlockedIndex, onModuleClick, selectedIndex }) => {
    // State to manage which module's topics are expanded
    const [openModuleIndex, setOpenModuleIndex] = useState(selectedIndex !== null ? selectedIndex : 0);

    const toggleCollapse = (index) => {
        setOpenModuleIndex(openModuleIndex === index ? null : index);
        // If they click a module that is not the selected one, select it
        if (index !== selectedIndex) {
             onModuleClick(modules[index], index);
        }
    };

    const getTopicIcon = (topic) => {
        if (topic.video) return <FaPlayCircle className="me-2 text-primary" />;
        if (topic.materials) return <FaFileAlt className="me-2 text-info" />;
        return <FaChevronRight className="me-2 text-muted" size={12}/>;
    }

    return (
        <Card className="shadow-lg mb-4 curriculum-card">
            <Card.Header className="curriculum-header fw-bold d-flex align-items-center justify-content-between" style={{ backgroundColor: 'var(--udemy-text)', color: 'white', borderRadius: '8px 8px 0 0' }}>
                Course Content
                <small className="fw-normal text-light">{modules.length} Modules</small>
            </Card.Header>
            <ListGroup variant="flush">
                {modules.map((mod, index) => {
                    const isUnlocked = index <= unlockedIndex;
                    const isCompleted = index < unlockedIndex; 
                    const isSelected = index === selectedIndex;
                    const isOpen = index === openModuleIndex;

                    return (
                        <div key={index} className="module-group-item">
                            {/* Module Header */}
                            <div
                                className={`module-item d-flex justify-content-between align-items-center p-3 cursor-pointer 
                                    ${isUnlocked ? 'unlocked' : 'locked'} ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                    onModuleClick(mod, index);
                                    toggleCollapse(index);
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    {isUnlocked ? (
                                        isCompleted ? <FaCheckCircle className="me-3 text-success" /> : 
                                                    (isSelected ? <FaChevronDown className="me-3 text-primary" size={14}/> : <FaChevronRight className="me-3 text-primary" size={14}/>)
                                    ) : (
                                        <FaLock className="me-3 text-muted" />
                                    )}
                                    <span className="module-title fw-bold" style={{ color: isCompleted ? 'var(--udemy-text)' : (isUnlocked ? 'var(--udemy-text)' : 'var(--udemy-gray)') }}>
                                        Module {index + 1}: {mod.moduleTitle}
                                    </span>
                                </div>
                                <small className="text-muted">{mod.duration}</small>
                            </div>

                            {/* Topics (Collapsible) */}
                            <Collapse in={isOpen && isUnlocked}>
                                <div className="topic-list">
                                    {mod.topics.map((topic, tIndex) => (
                                        <div key={tIndex} className="topic-item d-flex align-items-center p-2 ps-5 small" style={{ backgroundColor: isSelected ? 'rgba(86, 36, 208, 0.05)' : '#fafafa' }}>
                                            {getTopicIcon(topic)}
                                            <span className="text-muted">{topic.topicName || `Topic ${tIndex + 1}`}</span>
                                        </div>
                                    ))}
                                    
                                    {/* Quiz Marker */}
                                    {mod.hasQuiz && (
                                        <div className="topic-item d-flex align-items-center p-2 ps-5 small fw-bold quiz-marker" style={{ backgroundColor: isSelected ? 'rgba(86, 36, 208, 0.1)' : '#f0f0f0' }}>
                                            <FaLightbulb className="me-2 text-warning" />
                                            Quiz: Assessment
                                        </div>
                                    )}
                                </div>
                            </Collapse>
                        </div>
                    );
                })}
            </ListGroup>
        </Card>
    );
};

export default Curriculum;