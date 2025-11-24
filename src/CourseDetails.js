import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  ListGroup,
  Button,
} from "react-bootstrap";
import './CourseDetails.css';

// NEW imports
import Curriculum from "./components/Curriculum";
import "./components/Curriculum.css"; // ensure path is correct

const QuizRenderer = ({ quizData, moduleTitle, onAutoUnlock }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleOptionChange = (qIndex, option) => {
    if (!submitted) setUserAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const getCorrectAnswerText = (q) => {
    if (!q.correctAnswer || !q.options) return '';
    const correctIndex = q.correctAnswer.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    return q.options[correctIndex] || '';
  };

  const calculateScoreAndSubmit = () => {
    if (Object.keys(userAnswers).length !== quizData.length) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

    let currentScore = 0;
    quizData.forEach((q, index) => {
      const correctAnswerText = getCorrectAnswerText(q);
      if (String(userAnswers[index] || '').trim().toLowerCase() === String(correctAnswerText || '').trim().toLowerCase()) currentScore++;
    });

    setScore(currentScore);
    setSubmitted(true);

    // optional: if passing criteria used to auto-unlock, call onAutoUnlock
    if (onAutoUnlock) {
      const percent = (currentScore / quizData.length) * 100;
      if (percent >= 50) {
        onAutoUnlock(); // parent will unlock next
      } else {
        // do not unlock
      }
    }
  };

  const getOptionStyle = (q, option, qIndex) => {
    if (!submitted) return {};
    const correctAnswerText = getCorrectAnswerText(q);
    const isCorrect = String(option).trim().toLowerCase() === String(correctAnswerText).trim().toLowerCase();
    const isUserSelection = String(option).trim().toLowerCase() === String(userAnswers[qIndex] || '').trim().toLowerCase();

    if (isCorrect) return { backgroundColor: '#d4edda', borderColor: '#c3e6cb', fontWeight: 'bold' };
    if (isUserSelection && !isCorrect) return { backgroundColor: '#f8d7da', borderColor: '#f5c6cb', fontWeight: 'bold' };
    return {};
  };

  return (
    <Card className="mt-3 shadow-sm">
      <Card.Header className="bg-danger text-white fw-bold">📝 Quiz: {moduleTitle}</Card.Header>
      <Card.Body>
        {quizData.map((q, qIndex) => {
          const correctAnswerText = getCorrectAnswerText(q);
          const isUserCorrect = submitted && (String(userAnswers[qIndex] || '').trim().toLowerCase() === String(correctAnswerText).trim().toLowerCase());
          return (
            <div key={qIndex} className="mb-4 border-bottom pb-3">
              <p className="fw-bold">Q{qIndex + 1}: {q.question}</p>
              <div>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`quiz-q-${qIndex}`}
                      id={`q-${qIndex}-o-${oIndex}`}
                      checked={String(userAnswers[qIndex] || '') === String(option)}
                      onChange={() => handleOptionChange(qIndex, option)}
                      disabled={submitted}
                    />
                    <label className="form-check-label" htmlFor={`q-${qIndex}-o-${oIndex}`} style={getOptionStyle(q, option, qIndex)}>
                      {String.fromCharCode(65 + oIndex)}: {option}
                    </label>
                  </div>
                ))}
              </div>

              {submitted && (
                <div className="mt-2 p-2 small border-top pt-2">
                  <p className={`fw-bold ${isUserCorrect ? 'text-success' : 'text-danger'}`}>
                    {isUserCorrect ? '✅ Correct' : `❌ Incorrect (Correct Answer: ${correctAnswerText})`}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        <div className="d-grid gap-2">
          {!submitted ? (
            <Button variant="primary" onClick={calculateScoreAndSubmit} disabled={Object.keys(userAnswers).length !== quizData.length}>
              Submit Quiz & Get Score
            </Button>
          ) : (
            <Alert variant="success" className="mt-3 text-center">
              <h4>Score: {score} / {quizData.length}</h4>
              <p className="mb-1">Percentage: {Math.round((score / quizData.length) * 100)}%</p>
              <small className="text-muted">Review answers above.</small>
            </Alert>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};


// --- Main CourseDetails Component ---
const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_ENDPOINT = `https://poizdedgebackend.onrender.com/api/course/${courseId}`;

  // Curriculum / progress states
  const [unlockedIndex, setUnlockedIndex] = useState(0); // index allowed to click (0-based)
  const [selectedModule, setSelectedModule] = useState(null); // object of selected module
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCourse(null);

    const fetchCourse = async () => {
      try {
        const res = await axios.get(API_ENDPOINT);
        if (!res.data || Object.keys(res.data).length === 0) {
          throw new Error("API returned no data for this course ID.");
        }
        setCourse(res.data);

        // load progress from localStorage if available
        const stored = localStorage.getItem(`course_${courseId}_unlockedIndex`);
        if (stored !== null) {
          const val = parseInt(stored, 10);
          if (!isNaN(val)) setUnlockedIndex(val);
        } else {
          // default 0 (first module unlocked)
          setUnlockedIndex(0);
        }
      } catch (err) {
        console.error("Error fetching course:", err.message || err);
        setError("Failed to load course details. Check network or API server status.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId, API_ENDPOINT]);

  // save unlockedIndex to localStorage whenever it changes
  useEffect(() => {
    if (courseId) {
      localStorage.setItem(`course_${courseId}_unlockedIndex`, String(unlockedIndex));
    }
  }, [unlockedIndex, courseId]);

  // flatten modules into a list if you want lecture-level items.
  // For now we'll treat each module as a single curriculum item.
  const modules = course?.modules?.map((m) => ({
    ...m,
    moduleTitle: m.moduleTitle || m.title || "Untitled Module",
    duration: m.duration || m.estimatedDuration || "",
  })) || [];

  const handleModuleClick = (mod, index) => {
    if (index > unlockedIndex) {
      // user tried to open a module that is still locked
      alert(`Please complete Module ${unlockedIndex + 1} first.`);
      return;
    }

    // select module to show content
    setSelectedModule(mod);
    setSelectedIndex(index);

    // If user clicked the current unlocked index, automatically unlock the next
    // This matches behavior: open/play -> unlock next module
    if (index === unlockedIndex) {
      const next = unlockedIndex + 1;
      // ensure next does not exceed modules length - 1
      if (next < modules.length) {
        setUnlockedIndex(next);
      }
    }
  };

  // optional callback to let QuizRenderer auto-unlock next on pass
  const handleUnlockFromQuiz = () => {
    if (selectedIndex !== null) {
      const next = Math.max(unlockedIndex, selectedIndex + 1);
      if (next < modules.length) setUnlockedIndex(next);
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status" variant="primary" />
        <p className="mt-3">Loading Course Details...</p>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          📚 <strong>Error:</strong> {error || "Course not found."}
          <p className="mt-2 small mb-0">Please verify the `courseId` is correct and the API server at <code>https://poizdedgebackend.onrender.com</code> is running.</p>
        </Alert>
      </Container>
    );
  }

  // Helper for course image
  const renderCourseImage = () => {
    if (course.imageBase64) {
      const src = course.imageBase64;
      return <img src={src} alt={course.title} className="img-fluid rounded shadow-sm mb-4" style={{ maxWidth: '250px', objectFit: 'cover' }} />;
    }
    return null;
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5 align-items-center">
        <Col md={8}>
          <h1 className="display-4 mb-2 text-primary">{course.title}</h1>
          <p className="lead text-muted">{course.description}</p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <Button variant="success" size="lg" className="shadow-lg">Enroll Now - {course.price}</Button>
            <Button variant="outline-primary" size="lg">Lecture: {course.lecture}</Button>
          </div>
        </Col>
        <Col md={4} className="text-center text-md-end">
          {renderCourseImage()}
        </Col>
      </Row>

      <hr className="my-4" />

      {/* Overview Cards */}
      <Row className="g-4 mb-5">
        <Col lg={4} md={6}>
          <Card className="shadow-sm h-100 border-info">
            <Card.Body>
              <Card.Title className="text-info">ℹ️ Course Overview</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Category:</strong> {course.category}</ListGroup.Item>
                <ListGroup.Item><strong>Subjects:</strong> {course.Subjects}</ListGroup.Item>
                <ListGroup.Item><strong>Duration:</strong> {course.duration}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8} md={6}>
          <Card className="shadow-sm h-100 border-warning">
            <Card.Body>
              <Card.Title className="text-warning">📜 Detailed Description</Card.Title>
              <Card.Text>{course.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Curriculum + Module Content */}
      <Row className="mb-5">
        <Col md={4}>
          {/* Curriculum list (Udemy-style) */}
          <Curriculum modules={modules} unlockedIndex={unlockedIndex} onModuleClick={handleModuleClick} />
        </Col>

        <Col md={8}>
          {/* Module Content area */}
          {!selectedModule ? (
            <Card className="shadow-sm p-4">
              <h4 className="mb-2">Select a module to view content</h4>
              <p className="text-muted small">Click play on the left to open video and study material. Modules unlock one-by-one.</p>
            </Card>
          ) : (
            <div>
              <Card className="shadow-sm mb-3">
                <Card.Body>
                  <h3>{selectedModule.moduleTitle || selectedModule.title}</h3>
                  <p className="text-muted">{selectedModule.moduleDescription}</p>

                  {/* Show the first topic's video if you prefer; otherwise list all topics */}
                  {selectedModule.topics && selectedModule.topics.length > 0 ? (
                    selectedModule.topics.map((topic, tidx) => (
                      <div key={tidx} className="mb-4">
                        <h5 className="mb-2">{topic.topicName}</h5>

                        {topic.video?.uploadedFile ? (
                          <video controls src={topic.video.uploadedFile} style={{ width: "100%", maxHeight: 480 }} className="rounded" />
                        ) : topic.video?.url ? (
                          <a href={topic.video.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary mb-2">Open Video in new tab</a>
                        ) : null}

                        {topic.material?.fileUrl && (
                          <div className="mt-2">
                            <a href={topic.material.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">Download Material</a>
                          </div>
                        )}

                        {topic.material?.content && (
                          <p className="mt-2 small text-muted">{topic.material.content}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No topics available for this module.</p>
                  )}

                  {/* If module has quiz, show QuizRenderer and offer callback to unlock next on pass */}
                  {selectedModule.quiz && selectedModule.quiz.length > 0 && (
                    <QuizRenderer quizData={selectedModule.quiz} moduleTitle={selectedModule.moduleTitle} onAutoUnlock={handleUnlockFromQuiz} />
                  )}
                </Card.Body>
              </Card>

              {/* Optional manual 'Mark Completed' CTA if you want an explicit action */}
              <div className="d-flex justify-content-end">
                <Button
                  variant="success"
                  onClick={() => {
                    const next = Math.max(unlockedIndex, selectedIndex + 1);
                    if (next < modules.length) {
                      setUnlockedIndex(next);
                      localStorage.setItem(`course_${courseId}_unlockedIndex`, String(next));
                    }
                    alert("Module marked completed. Next module unlocked (if any).");
                  }}
                >
                  Mark Module Completed
                </Button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetails;
