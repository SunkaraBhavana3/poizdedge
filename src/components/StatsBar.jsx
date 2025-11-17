import React from 'react';

const StatsBar = () => {
  // Define your brand colors from the logo
  const accentLightBlue = '#3B82F6'; // Lighter, vibrant blue for numbers

  const stats = [
    { number: '10,000+', label: 'Students Enrolled' },
    { number: '3+', label: 'Expert Teachers' },
    { number: '100+', label: 'Courses Available' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-gray-200 pb-10">
        {stats.map((stat, index) => (
          <div key={index} className="p-2">
            <p 
              className="text-3xl font-extrabold mb-1" 
              style={{ color: accentLightBlue }} // Use the vibrant accent color for the numbers
            >
              {stat.number}
            </p>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
