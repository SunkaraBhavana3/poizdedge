import React from 'react';

const HowItWorksSection = () => {
  // Define your brand colors from the logo for consistent styling
  const primaryBlue = '#1E3A8A'; // Deeper blue (used for text that needs more prominence)
  const accentLightBlue = '#3B82F6'; // Lighter, vibrant blue (for the numbered circles)

  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up for free and explore our course catalog',
    },
    {
      number: 2,
      title: 'Choose Your Course',
      description: 'Select from our wide range of subjects and classes',
    },
    {
      number: 3,
      title: 'Start Learning',
      description: 'Access videos, materials, and track your progress',
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <p className="text-md text-gray-500 mb-2">How It Works</p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Start learning in three simple steps
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Step Number Circle */}
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-bold mb-6 shadow-lg"
                style={{ backgroundColor: accentLightBlue }} // Use accent blue for the circles
              >
                {step.number}
              </div>
              {/* Step Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{ color: primaryBlue }}>
                {step.title}
              </h3>
              {/* Step Description */}
              <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
