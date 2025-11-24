import React from 'react';
import { PlayCircle } from 'lucide-react'; 
import institutelogo2 from "../assets/institutelogo2.png";

const HeroSection = () => {
  const primaryBlue = '#1E3A8A'; 
  const accentLightBlue = '#3B82F6'; 

  return (
    <section 
      className="relative text-white py-20 lg:py-32 overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 text-center flex flex-col items-center lg:items-start mb-12 lg:mb-0"> 
          <h2 
            className="text-base font-medium uppercase tracking-wider mb-4"
            style={{ color: accentLightBlue }}
          >
            Transform Your Learning Journey
          </h2>

          {/* ✅ Smaller text + each question on new line */}
          <p className="text-2xl sm:text-3xl font-extrabold leading-snug mb-8 max-w-xl lg:text-left">
            Are you a graduate?? <br />
            Still struggling to find a job?? <br />
            Confused about which career to choose?? <br />
            Don’t know how to trust an institute?? <br />
            Not confident and failed in interviews??
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"> 
    <button 
  className="px-6 py-3 border-2 border-white text-base font-medium rounded-full text-white transition duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-200/40"
>
  Join Us
</button>




            <button 
              className="px-6 py-3 flex items-center space-x-2 border-2 border-transparent text-base font-medium rounded-full transition duration-300 ease-in-out"
              style={{ backgroundColor: accentLightBlue, color: 'white' }}
            >
              <PlayCircle className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end relative z-0">
          <div className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out">
            <img 
              src={institutelogo2}
              alt="Student learning online"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
