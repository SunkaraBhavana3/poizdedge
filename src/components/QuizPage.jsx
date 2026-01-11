// QuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";

const QuizPage = () => {
  const { courseId, moduleId } = useParams(); // params from route
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`https://poizdedgebackend.onrender.com/api/course/${courseId}`);
        const courseData = res.data;
        const moduleData = courseData.modules.find(m => m.moduleId === moduleId);
        if (!moduleData || !moduleData.quiz) throw new Error("Quiz not found");
        setQuiz(moduleData.quiz);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [courseId, moduleId]);

  const handleOptionChange = (qIndex, option) => {
    if (!submitted) setUserAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const calculateScore = () => {
    if (!quiz) return;
    if (Object.keys(userAnswers).length !== quiz.length) {
      alert("Please answer all questions.");
      return;
    }

    let currentScore = 0;
    quiz.forEach((q, i) => {
      const correctIndex = q.correctAnswer.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
      const correctText = q.options[correctIndex];
      if ((userAnswers[i] || "").trim().toLowerCase() === correctText.trim().toLowerCase()) currentScore++;
    });

    setScore(currentScore);
    setSubmitted(true);
  };

  if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5 text-center"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>← Back to Course</Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white fw-bold">Quiz: {moduleId}</Card.Header>
        <Card.Body>
          {quiz.map((q, qIndex) => {
            const correctIndex = q.correctAnswer.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
            const correctText = q.options[correctIndex];

            return (
              <div key={qIndex} className="mb-4">
                <p className="fw-bold">Q{qIndex + 1}: {q.question}</p>
                {q.options.map((opt, oIndex) => {
                  const isUserSelection = userAnswers[qIndex] === opt;
                  const isCorrect = submitted && opt === correctText;

                  return (
                    <div className="form-check mb-2" key={oIndex}>
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`q-${qIndex}`}
                        checked={isUserSelection || false}
                        onChange={() => handleOptionChange(qIndex, opt)}
                        disabled={submitted}
                      />
                      <label className="form-check-label" style={isCorrect ? {backgroundColor:'#d4edda', fontWeight:'bold'} : isUserSelection && !isCorrect ? {backgroundColor:'#f8d7da', fontWeight:'bold'} : {}}>
                        {String.fromCharCode(65 + oIndex)}. {opt}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {!submitted ? (
            <Button variant="success" onClick={calculateScore}>Submit Quiz</Button>
          ) : (
            <Alert variant="info" className="mt-3">
              <h4>Score: {score} / {quiz.length}</h4>
              <p>Percentage: {Math.round((score / quiz.length) * 100)}%</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuizPage;
