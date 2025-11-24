import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ClinicalData = ({ courseId }) => {
  const [courseData, setCourseData] = useState(null);
  const [modulesData, setModulesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModules, setActiveModules] = useState([]);
  const [completedLessons, setCompletedLessons] = useState({});
  const [courseProgress, setCourseProgress] = useState(0);
  const contentRefs = useRef({});

  // Fetch course data from backend
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${courseId}`);
        setCourseData(res.data);
        setModulesData(res.data.modules); // Assume backend sends modules
        setLoading(false);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Calculate progress
  useEffect(() => {
    const totalLessons = modulesData.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedCount = Object.values(completedLessons).filter(Boolean).length;
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    setCourseProgress(progress);
  }, [completedLessons, modulesData]);

  const toggleModule = (id) => {
    setActiveModules((prev) =>
      prev.includes(id) ? prev.filter((modId) => modId !== id) : [...prev, id]
    );
  };

  const toggleLesson = (lessonId) => {
    setCompletedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  const isModuleActive = (id) => activeModules.includes(id);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="course-page-container">
      <h1>{courseData.title}</h1>
      <p>{courseData.description}</p>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${courseProgress}%` }}
        >
          {courseProgress > 5 ? `Course Progress: ${courseProgress}% Completed` : 'Start Your Journey!'}
        </div>
      </div>

      {/* Modules */}
      <div className="modules-section">
        <h2>Curriculum & Modules</h2>
        {modulesData.map((module) => {
          const moduleLessons = module.lessons.map((l) => l._id);
          const completedInModule = moduleLessons.filter((id) => completedLessons[id]).length;
          const isModuleComplete = moduleLessons.length > 0 && completedInModule === moduleLessons.length;

          return (
            <div key={module._id} className="module-card">
              <div
                className={`module-header ${isModuleActive(module._id) ? "active" : ""}`}
                onClick={() => toggleModule(module._id)}
              >
                <div>
                  {module.title} {isModuleComplete && <span>🎉 Completed</span>}
                </div>
                <span>{isModuleActive(module._id) ? '▲' : '▼'}</span>
              </div>
              <div
                ref={(el) => (contentRefs.current[module._id] = el)}
                className="module-content"
                style={{
                  maxHeight: isModuleActive(module._id)
                    ? `${contentRefs.current[module._id]?.scrollHeight || 500}px`
                    : "0px",
                }}
              >
                <ul className="lesson-list">
                  {module.lessons.map((lesson) => (
                    <li key={lesson._id} className="lesson-item">
                      <div>
                        <span
                          className={completedLessons[lesson._id] ? 'completed' : 'incomplete'}
                          onClick={(e) => { e.stopPropagation(); toggleLesson(lesson._id); }}
                        >
                          {completedLessons[lesson._id] ? '✔' : '○'}
                        </span>
                        {lesson.type === 'Video' && <span>▶</span>}
                        {lesson.type === 'Reading' && <span>📖</span>}
                        {lesson.type === 'Quiz' && <span>❓</span>}
                        <span style={{ marginLeft: '10px' }}>{lesson.title}</span>
                      </div>
                      <small>({lesson.duration})</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClinicalData;
