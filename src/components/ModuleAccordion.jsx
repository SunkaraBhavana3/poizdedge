import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicItem from "./TopicItem";
import { ChevronDown, ChevronUp, Lock, CheckCircle, PlayCircle } from "lucide-react";

export default function ModuleAccordion({ module, moduleIndex, isUnlocked, progress, updateProgress }) {
  const [isExpanded, setIsExpanded] = useState(moduleIndex === 0);
  const navigate = useNavigate();

  // Check if quiz is unlocked (all topics completed)
  const isQuizUnlocked = () => module.topics.every(topic => progress.completedTopics?.includes(topic.id));

  // Check if quiz is completed
  const isQuizCompleted = () => progress.completedQuizzes?.includes(module.id);

  const handleQuizClick = () => {
    if (isQuizUnlocked()) {
      navigate(`/quiz/${module.id}`);
    }
  };

  // Locked Module View
  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-xl p-6 border-2 border-slate-200 opacity-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Lock className="w-6 h-6 text-slate-400" />
            <div>
              <h3 className="text-slate-800 font-semibold">{module.title}</h3>
              <p className="text-slate-500 text-sm">Complete previous module to unlock</p>
            </div>
          </div>
          <div className="text-slate-500 text-sm">{module.duration}</div>
        </div>
      </div>
    );
  }

  // Unlocked Module View
  return (
    <div className="bg-white rounded-xl border-2 border-cyan-200 overflow-hidden transition-all hover:border-cyan-400 hover:shadow-lg">
      {/* Module Header */}
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 flex-1">
          {isQuizCompleted() ? (
            <CheckCircle className="w-6 h-6 text-green-600" />
          ) : (
            <PlayCircle className="w-6 h-6 text-cyan-600" />
          )}
          <div>
            <h3 className="text-slate-800 font-semibold">{module.title}</h3>
            <p className="text-slate-600 text-sm">{module.topics.length} topics • {module.duration}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isQuizCompleted() && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          )}
          <span className="text-slate-500 text-sm">{module.duration}</span>
          {isExpanded ? <ChevronUp className="w-6 h-6 text-slate-600" /> : <ChevronDown className="w-6 h-6 text-slate-600" />}
        </div>
      </div>

      {/* Module Topics & Quiz */}
      {isExpanded && (
        <div className="border-t border-slate-200">
          <div className="p-6 space-y-3">
            {module.topics.map((topic, topicIndex) => (
              <TopicItem
                key={topic.id}
                topic={topic}
                topicIndex={topicIndex}
                module={module}
                progress={progress}
                updateProgress={updateProgress}
              />
            ))}

            {/* Module Quiz Block */}
            <div
              className={`mt-6 p-5 rounded-lg border-2 transition-all ${
                isQuizUnlocked()
                  ? "bg-orange-50 border-orange-300 hover:border-orange-500 cursor-pointer hover:shadow-md"
                  : "bg-slate-50 border-slate-300 opacity-60"
              } ${isQuizCompleted() ? "bg-green-50 border-green-300" : ""}`}
              onClick={handleQuizClick}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isQuizCompleted() ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : isQuizUnlocked() ? (
                    <span className="text-2xl">📝</span>
                  ) : (
                    <Lock className="w-6 h-6 text-slate-400" />
                  )}
                  <div>
                    <h4 className="text-slate-800 font-semibold">Module Quiz</h4>
                    <p className="text-slate-600 text-sm">
                      {isQuizUnlocked()
                        ? isQuizCompleted()
                          ? "Quiz completed! Click to retake."
                          : "Test your knowledge of this module"
                        : "Complete all topics to unlock"}
                    </p>
                  </div>
                </div>
                {isQuizCompleted() && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Passed
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
