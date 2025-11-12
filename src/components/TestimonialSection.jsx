import React from 'react';
import { CheckCircle } from 'lucide-react'; // Using CheckCircle icon for the verified look

const TestimonialSection = () => {
  // Define brand colors for consistency
  const primaryBlue = '#1E3A8A';
  const accentLightBlue = '#3B82F6';

  const testimonials = [
    {
      name: 'Priya Sharma',
      class: 'Class 10',
      quote: '“EduMaster helped me score 95% in my board exams! The teachers are amazing and the study materials are comprehensive.”',
    },
    {
      name: 'Rahul Verma',
      class: 'Class 12',
      quote: '“The demo classes convinced me to enroll. Best decision ever! I improved my understanding of complex topics significantly.”',
    },
    {
      name: 'Ananya Patel',
      class: 'Class 10',
      quote: '“Outstanding platform! The practice tests and progress tracking features are incredibly helpful for exam preparation.”',
    },
  ];

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <p className="text-md font-medium mb-2" style={{ color: primaryBlue }}>
          Student Success Stories
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">
          Hear from our top performers
        </h2>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-start text-left hover:shadow-2xl transition duration-300"
            >
              {/* Profile Header */}
              <div className="flex items-center mb-4">
                <CheckCircle 
                  className="w-8 h-8 mr-3 p-1 rounded-full text-white" 
                  style={{ backgroundColor: accentLightBlue }} 
                  fill={accentLightBlue}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.class}</p>
                </div>
              </div>

              {/* Quote/Story */}
              <p className="text-gray-700 italic leading-relaxed text-sm">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
