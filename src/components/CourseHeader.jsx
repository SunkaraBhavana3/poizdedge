import React, { useState } from "react";

export default function CourseHeader({ course }) {
  const [imgError, setImgError] = useState(false);

  // Total duration calculation
  const totalMinutes = course.modules.reduce((total, module) => {
    const [hoursPart, minutesPart] = module.duration.split("h");
    const hours = parseInt(hoursPart) || 0;
    const minutes = parseInt(minutesPart?.split("m")[0]) || 0;
    return total + hours * 60 + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Course Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imgError ? "/fallback-image.png" : course.image}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-white text-3xl font-bold mb-2">{course.title}</h1>
          {course.shortDescription && (
            <p className="text-white/90">{course.shortDescription}</p>
          )}
        </div>
      </div>

      {/* Course Details */}
      <div className="p-8 space-y-4">
        <p className="text-slate-700">{course.description}</p>

        <div className="flex flex-wrap gap-6 text-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">{course.modules.length}</span>
            <span>Modules</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">{course.finalTests.length}</span>
            <span>Final Tests</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-blue-600 font-semibold">
              {hours}h {minutes}m
            </span>
            <span>Total Duration</span>
          </div>
        </div>

        {/* Call-to-action Button */}
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Course
          </button>
        </div>
      </div>
    </div>
  );
}
