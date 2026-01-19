import React from 'react';
import institutelogo2 from "../assets/image.jpg";

const HeroSection = () => {
  const primaryBlue = '#1E3A8A';
  const accentLightBlue = '#3B82F6';

  return (
    <section
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: primaryBlue, paddingTop: '165px', paddingBottom: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">

        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:w-1/2 w-full flex flex-col items-start text-left mb-12 lg:mb-0">

          {/* Heading — SAME LEFT ALIGNMENT */}
          <h2
            className="text-base font-semibold uppercase tracking-wide mb-4"
            style={{ color: accentLightBlue }}
          >
            Transform Your Learning Journey
          </h2>

          {/* Paragraph — SAME LEFT ALIGNMENT */}
          <p className="text-xl sm:text-2xl font-semibold leading-relaxed max-w-xl">
            Are you a graduate?? <br />
            Still struggling to find a job?? <br />
            Confused about which career to choose?? <br />
            Don’t know how to trust an institute?? <br />
            Not confident and failed in interviews??
          </p>

        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
            <img
              src={institutelogo2}
              alt="Student learning"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
