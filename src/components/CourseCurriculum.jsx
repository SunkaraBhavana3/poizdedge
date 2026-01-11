import React, { useState } from "react";
// Assuming 'react-router-dom' is available for useNavigate
import { useNavigate } from "react-router-dom"; 
// Added Award and X for visual feedback and alert closure
import { Lock, CheckCircle, ChevronDown, ChevronUp, Award, X, Zap } from "lucide-react";

/**
 * A highly visual and interactive component for displaying a course curriculum.
 * Features module locking, topic tracking, and distinct styling for quizzes/lectures.
 * Utilizes Tailwind CSS for a professional, status-driven UI design matching the provided screenshots.
 */
const CourseCurriculum = ({ modules = [], unlockedIndex = 0 }) => {
  // Use useNavigate if available, otherwise default to a mock function
  const navigate = typeof useNavigate === 'function' ? useNavigate() : () => console.log('Navigation called (mocked).');

  // State for tracking custom alert message (replaces forbidden window.alert)
  const [showAlert, setShowAlert] = useState(false);
  
  // State for tracking which topic is unlocked within the current module index (for finer-grained control)
  const [topicUnlockedMap, setTopicUnlockedMap] = useState(
    modules.map(() => 0)
  );
  
  // State for handling the currently open (expanded) module
  const [openModuleId, setOpenModuleId] = useState(null);

  const toggleModule = (moduleId) => {
    setShowAlert(false); // Clear alert on interaction
    setOpenModuleId(openModuleId === moduleId ? null : moduleId);
  };

  const handleTopicClick = (moduleIndex, topicIndex, mod, topic) => {
    setShowAlert(false);
    
    // Check module lock status (e.g., if you are trying to access module 3, but only module 2 is unlocked)
    const moduleLocked = moduleIndex > unlockedIndex;
    // Check topic lock status (e.g., if you are trying to access topic 3, but only topic 2 is completed)
    const topicLocked = topicIndex > (topicUnlockedMap[moduleIndex] || 0);

    if (moduleLocked || topicLocked) {
      setShowAlert(true);
      return;
    }

    // --- Core Logic for Topic Completion/Navigation ---

    // 1. Simulate navigation to the content viewer
    if (mod.type !== "quiz") {
      console.log(`Navigating to lecture: ${mod.moduleTitle} - ${topic.topicName}`);
      // In a real app: navigate(`/course-details/${mod.courseId}/lecture/${mod.moduleId}/${topicIndex}`);
    }

    // 2. Unlock next topic automatically (simulating completion)
    setTopicUnlockedMap((prev) => {
      const copy = [...prev];
      const totalTopicsInModule = mod.topics?.length || 0;

      // Only unlock if the current topic is not the last one
      if (topicIndex + 1 < totalTopicsInModule) {
        copy[moduleIndex] = topicIndex + 1;
      }
      // Note: Module completion/unlockedIndex update would happen in the parent component 
      // when the final topic/quiz of the module is marked truly complete.
      return copy;
    });
  };

  // --- RENDERING ---
  return (
    <div className="p-6 relative">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Course Content Overview</h2>

      {/* Custom Alert Message (Responsive Modal) */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
            <div className="bg-red-500 text-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 transition-all duration-300 transform scale-100 border-b-4 border-red-700">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold flex items-center">
                        <Lock className="w-5 h-5 mr-3" /> Module Locked
                    </h3>
                    <button 
                        onClick={() => setShowAlert(false)} 
                        className="p-1 rounded-full hover:bg-red-600 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="mt-3 text-sm font-medium">
                    You must complete all topics and previous modules before accessing this content.
                </p>
            </div>
        </div>
      )}

      {modules.map((mod, moduleIndex) => {
        const isModuleLocked = moduleIndex > unlockedIndex;
        // Check if the module is the current one the user should be on
        const isModuleCurrent = moduleIndex === unlockedIndex;
        // Check if the module is completed
        const isModuleCompleted = moduleIndex < unlockedIndex; 
        const isQuiz = mod.type === "quiz";
        const isOpen = openModuleId === mod.moduleId;
        const duration = mod.duration || mod.estimatedDuration || "";
        const moduleTitle = mod.moduleTitle || mod.title || 'Untitled Module';

        // --- Determine Dynamic Header Styling ---
        let headerBgClass = 'bg-white hover:bg-gray-50'; // Default hover
        let iconComponent;
        let iconColorClass = 'text-gray-400';

        if (isModuleLocked) {
            headerBgClass = 'bg-gray-50 cursor-not-allowed opacity-80';
            iconComponent = <Lock className={`w-5 h-5 mr-3 ${iconColorClass}`} />;
        } else if (isQuiz) {
            headerBgClass = isModuleCompleted ? 'bg-green-50 hover:bg-green-100' : 'bg-yellow-50 hover:bg-yellow-100';
            iconColorClass = isModuleCompleted ? 'text-green-600' : 'text-yellow-600';
            iconComponent = <Award className={`w-5 h-5 mr-3 ${iconColorClass} fill-current`} />;
        } else { // Lecture or Standard Module
            headerBgClass = isModuleCompleted ? 'bg-green-50 hover:bg-green-100' : 'bg-blue-50 hover:bg-blue-100';
            iconColorClass = isModuleCompleted ? 'text-green-600' : 'text-blue-600';
            iconComponent = <CheckCircle className={`w-5 h-5 mr-3 ${iconColorClass} fill-current`} />;
        }


        return (
          <div key={mod.moduleId ?? moduleIndex} className="mb-4 border border-gray-200 rounded-xl overflow-hidden shadow-md">
            {/* Module Header */}
            <div
              className={`flex justify-between items-center p-4 transition-all duration-200 ${isModuleLocked ? headerBgClass : `cursor-pointer ${headerBgClass}`}`}
              onClick={() => {
                if (isModuleLocked) {
                    setShowAlert(true);
                    return;
                }
                toggleModule(mod.moduleId);
                // Directly navigate to quiz if it's unlocked
                if (isQuiz) {
                  navigate(`/course-details/${mod.courseId}/quiz/${mod.moduleId}`);
                }
              }}
            >
              <div className="flex items-center flex-1 min-w-0">
                {iconComponent}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-bold text-gray-800 truncate ${isModuleLocked ? 'text-gray-500' : ''}`}>
                    <span className="mr-1">{moduleIndex + 1}.</span> {moduleTitle}
                  </h3>
                  {mod.subtitle && <p className="text-sm text-gray-500 truncate">{mod.subtitle}</p>}
                </div>
              </div>
              
              <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
                {/* Status Badge */}
                {isQuiz && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isModuleCompleted ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white shadow-md'}`}>
                        {isModuleCompleted ? 'Completed' : 'Quiz Time'}
                    </span>
                )}
                <span className="text-sm text-gray-500">{duration}</span>
                {!isQuiz && !isModuleLocked && (isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />)}
              </div>
            </div>

            {/* Topics List (For Lectures/Non-Quiz Modules only) */}
            {isOpen && mod.topics && mod.topics.length > 0 && !isQuiz && (
              <div className="p-4 bg-white border-t border-gray-100">
                {mod.topics.map((topic, topicIndex) => {
                  const topicIsCompleted = topicIndex < (topicUnlockedMap[moduleIndex] || 0);
                  const topicIsCurrent = isModuleCurrent && topicIndex === (topicUnlockedMap[moduleIndex] || 0);
                  const topicLocked = moduleIndex > unlockedIndex || topicIndex > (topicUnlockedMap[moduleIndex] || 0);

                  let topicIcon = <Zap className="w-4 h-4 mr-3 text-blue-500" />;
                  let topicClass = 'text-gray-800';
                  
                  if (topicLocked) {
                    topicIcon = <Lock className="w-4 h-4 mr-3 text-gray-400" />;
                    topicClass = 'text-gray-500';
                  } else if (topicIsCompleted) {
                    topicIcon = <CheckCircle className="w-4 h-4 mr-3 text-green-500 fill-green-100" />;
                    topicClass = 'text-gray-600 line-through';
                  } else if (topicIsCurrent) {
                    topicIcon = <Zap className="w-4 h-4 mr-3 text-blue-600 animate-pulse" />;
                    topicClass = 'text-blue-700 font-medium';
                  }

                  return (
                    <div
                      key={topicIndex}
                      className={`flex justify-between items-center py-3 px-3 rounded-lg transition-colors border-b border-gray-100 last:border-b-0
                        ${topicLocked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100/70'}`}
                      onClick={() => handleTopicClick(moduleIndex, topicIndex, mod, topic)}
                    >
                      <div className="flex items-center text-sm">
                        {topicIcon}
                        <span className={topicClass}>{topic.topicName || topic.name}</span>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{topic.duration}</span>
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

export default CourseCurriculum;