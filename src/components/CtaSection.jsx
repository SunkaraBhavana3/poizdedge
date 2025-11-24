import React from 'react';
import { ArrowRight } from 'lucide-react'; 

const CtaSection = () => {
    // Define brand colors based on established colors
    const primaryBlue = '#1E3A8A'; // Deep blue for background
    const accentLightBlue = '#3B82F6'; // Vibrant blue for buttons

    return (
        <section 
            className="py-16 md:py-24" 
            style={{ backgroundColor: primaryBlue }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    Ready to take the next step in your career?
                </h2>
                <p className="text-xl font-light mb-10 opacity-90 max-w-3xl mx-auto">
                    Enroll now in our flagship programs and gain the edge you need for success.
                </p>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Primary Button: Sign Up Now - MODIFIED CLASSES */}
                    <a 
                        href="#" 
                        className="px-6 py-3 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
                        style={{ backgroundColor: accentLightBlue }}
                    >
                        Sign Up Now
                    </a>
                    
                    {/* Secondary Button: Browse Courses - MODIFIED CLASSES */}
                    <a 
                        href="#" 
                        className="px-6 py-3 font-semibold rounded-lg border-2 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                        style={{ borderColor: 'white', color: 'white' }}
                    >
                        <span>Browse Courses</span>
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;