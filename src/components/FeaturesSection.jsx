import React from 'react';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

// Required Constant for Styling
const accentLightBlue = '#3B82F6';

const FeaturesSection = () => {
  const features = [
    { icon: BookOpen, title: 'Expert Teachers', description: 'Learn from experienced educators with proven track records.' },
    { icon: Users, title: 'Interactive Learning', description: 'Engage with live classes and interactive study materials.' },
    { icon: Award, title: 'Certified Courses', description: 'Get certificates upon course completion.' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Monitor your learning journey with detailed analytics.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="text-center mb-12">
        <p className="text-md text-gray-500 mb-2">Why Choose Poizdedge Institute?</p>
        <h3 className="text-3xl font-extrabold text-gray-900">
          Everything you need to excel in your studies
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="flex justify-center mb-4">
              {/* Feature Icon using dynamic style with accentLightBlue */}
              <feature.icon className="w-10 h-10 p-2 rounded-full" style={{ color: accentLightBlue, backgroundColor: '#EFF6FF' }} />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
