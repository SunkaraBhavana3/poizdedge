import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Curriculum.css";

const Curriculum = ({ modules = [], unlockedIndex = 0 }) => {
  const navigate = useNavigate();
  const [topicUnlockedMap, setTopicUnlockedMap] = useState(
    modules.map(() => 0)
  );

  const handleTopicClick = (moduleIndex, topicIndex, mod, topic) => {
    const moduleLocked = moduleIndex > unlockedIndex;
    const topicLocked = topicIndex > (topicUnlockedMap[moduleIndex] || 0);

    if (moduleLocked || topicLocked) {
      alert("Please complete previous topics/modules first.");
      return;
    }

    // If the module is a quiz, navigate to QuizPage
    if (mod.type === "quiz") {
      navigate(`/course-details/${mod.courseId}/quiz/${mod.moduleId}`);
      return;
    }

    // unlock next topic automatically
    setTopicUnlockedMap((prev) => {
      const copy = [...prev];
      if (topicIndex + 1 < (mod.topics?.length || 0)) {
        copy[moduleIndex] = topicIndex + 1;
      }
      return copy;
    });
  };

  return (
    <div className="curriculum-container">
      <h3 className="curriculum-header">Course Curriculum</h3>

      {modules.map((mod, moduleIndex) => {
        const isModuleLocked = moduleIndex > unlockedIndex;
        const badge = mod.type === "quiz" ? "Quiz" : "Lecture";
        const duration = mod.duration || mod.estimatedDuration || "";

        return (
          <div key={mod.moduleId ?? moduleIndex} className="curriculum-item">
            {/* Module Header */}
            <div
              className={`module-header ${isModuleLocked ? "locked" : ""}`}
              onClick={() => {
                if (isModuleLocked) return;
                if (mod.type === "quiz") {
                  navigate(`/course-details/${mod.courseId}/quiz/${mod.moduleId}`);
                }
              }}
            >
              <div className="left">
                {isModuleLocked ? (
                  <span className="lock-icon">🔒</span>
                ) : (
                  <button
                    className={`play-btn ${badge === "Quiz" ? "start-btn" : ""}`}
                  >
                    {badge === "Quiz" ? "Start Quiz" : "Play"}
                  </button>
                )}
                <div>
                  <p className="lecture-title">
                    {moduleIndex + 1}. {mod.moduleTitle || mod.title}
                  </p>
                  {mod.subtitle && <small className="lecture-sub">{mod.subtitle}</small>}
                </div>
              </div>
              <div className="right">
                <span className="duration">{duration}</span>
              </div>
            </div>

            {/* Topics List */}
            {!isModuleLocked &&
              mod.topics &&
              mod.topics.length > 0 &&
              mod.type !== "quiz" && (
                <div className="topics-list">
                  {mod.topics.map((topic, topicIndex) => {
                    const topicLocked =
                      topicIndex > (topicUnlockedMap[moduleIndex] || 0);

                    return (
                      <div
                        key={topicIndex}
                        className={`topic-item ${topicLocked ? "locked" : ""}`}
                        onClick={() =>
                          handleTopicClick(moduleIndex, topicIndex, mod, topic)
                        }
                      >
                        {topicLocked ? (
                          <span className="lock-icon">🔒</span>
                        ) : (
                          <button className="play-btn small">Play</button>
                        )}
                        <span className="topic-title">{topic.topicName}</span>
                        {topic.duration && (
                          <span className="topic-duration">{topic.duration}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default Curriculum;
