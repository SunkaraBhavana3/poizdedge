import React from 'react';
import { Quote } from 'lucide-react';
import  madam from './r.jpg';
const TestimonialSection = () => {
  const primaryBlue = '#1E3A8A';
  const accentLightBlue = '#3B82F6';

  const testimonials = [
    {
      name: 'Riki Talukdar',
      profileImage: madam, // Replace with your actual student image URL
      role: 'Diploma in Clinical Research',
      quote: `It was a pleasure learning from Bhanu Ma'am during my Diploma in Clinical Research. She made complex topics in Medical Coding easy to understand, ensured every student followed along, and clarified doubts with practical examples.`,
    },
    {
      name: 'Dr. Krishna D',
      role: 'Regulatory Affairs Student',
      quote: `I sincerely appreciate Bhanu Madam for her informative and well-structured Regulatory Affairs classes. She explained complex concepts clearly, used practical examples, and bridged theory with real-world applications.`,
    },
    {
      name: 'Ananya Patel',
      role: 'Advanced Diploma in Clinical Research',
      quote: `I had an opportunity to attend Ms. Bhanu Melvin's class on Clinical Data Management. I appreciated her friendly and approachable demeanor, which made the learning experience very comfortable.`,
    },
  ];

  // Helper to get initials if no image exists
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      id="testimonials"
      className="bg-gray-50 py-16 sm:py-24 font-sans scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-blue-50 text-blue-700">
          Student Success Stories
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Hear from our top performers
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto mb-12 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start text-left hover:shadow-xl transition-all duration-300 relative group"
            >
              {/* Decorative Quote Icon */}
              <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} style={{ color: primaryBlue }} />
              </div>

              <div className="flex items-center mb-6">
                {/* Profile Image or Initial Avatar */}
                <div className="relative">
                  {testimonial.profileImage ? (
                    <img 
                      src={testimonial.profileImage} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                      style={{ 
                        background: `linear-gradient(135deg, ${accentLightBlue}, ${primaryBlue})` 
                      }}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                  )}
                  {/* Verified badge style circle */}
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
                </div>

                <div className="ml-4">
                  <p className="text-lg font-bold text-gray-900 leading-tight">{testimonial.name}</p>
                  <p className="text-xs font-medium uppercase tracking-wide mt-1" style={{ color: accentLightBlue }}>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="relative">
                <p className="text-gray-600 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;