// ... your existing imports
import React, { useState } from 'react';
import { CheckCircle, Phone, GraduationCap } from 'lucide-react';

// InputField component stays the same
const InputField = ({ label, name, type, placeholder, value, onChange, options, required = false, colSpan = "col-span-2" }) => (
  <div className={colSpan}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                   shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                   shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    )}
  </div>
);

const SignUpPage = () => {
  const primaryBlue = '#2B6CB0'; 
  const darkBlue = '#1A202C';   
  const lightGrayBackground = '#F7FAFC'; 
  const secondaryTextColor = '#4A5568'; 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    courseOfInterest: 'Select a course',
    highestQualification: 'Select qualification',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign Up Form Submitted:', formData);
    alert('Form submitted successfully!');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    alert('Google Sign-In initiated...');
  };

  const courseOptions = ['Select a course','Mathematics','Science','English','History'];
  const qualificationOptions = ['Select qualification','High School','Associate Degree',"Bachelor's Degree","Master's Degree",'Ph.D.'];

  return (
    <div className="min-h-screen font-sans pt-16" style={{ backgroundColor: lightGrayBackground }}>
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto my-8 p-0 bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* Left Section */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between" style={{ backgroundColor: '#ffffff' }}>
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <GraduationCap style={{ color: primaryBlue }} className="w-8 h-8 flex-shrink-0" />
              <h1 className="text-2xl font-bold" style={{ color: darkBlue }}>The Poizdedge Institute</h1>
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6" style={{ color: darkBlue }}>Start Your Journey to Success</h2>
            <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>
              Join thousands of students who have transformed their careers with our industry-leading programs.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Access to all course materials and resources',
                'Priority admission and batch selection',
                'Career counseling and placement support',
                'Alumni network access',
                'Lifetime course updates'
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3 text-base" style={{ color: secondaryTextColor }}>
                  <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: primaryBlue }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8" style={{ backgroundColor: lightGrayBackground, border: `1px solid ${primaryBlue}1A` }}>
            <h4 className="font-semibold mb-2" style={{ color: darkBlue }}>Need Help?</h4>
            <p className="text-sm mb-3" style={{ color: secondaryTextColor }}>Our admissions team is available to assist you</p>
            <a href="tel:+919876543210" className="flex items-center space-x-2 text-sm font-medium" style={{ color: primaryBlue }}>
              <Phone className="w-4 h-4" />
              <span>Call: +91 98765 43210</span>
            </a>
          </div>
        </div>

        {/* Right Section: Sign Up Form */}
        <div className="lg:w-1/2 p-8 lg:p-12" style={{ backgroundColor: '#ffffff' }}>
          <h2 className="text-3xl font-bold mb-2" style={{ color: darkBlue }}>Create Account</h2>
          <p className="text-sm text-gray-600 mb-8">
            Already have an account? <a href="#" style={{ color: primaryBlue }} className="font-medium hover:underline">Sign In</a>
          </p>

          <form className="grid grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSubmit}>
            <InputField label="First Name" name="firstName" type="text" placeholder="John" value={formData.firstName} onChange={handleChange} required colSpan="col-span-1" />
            <InputField label="Last Name" name="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleChange} required colSpan="col-span-1" />
            <InputField label="Email Address" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required />
            <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+91 98765 43210" value={formData.phoneNumber} onChange={handleChange} required />
            <InputField label="Course Interested In" name="courseOfInterest" type="select" value={formData.courseOfInterest} onChange={handleChange} required options={courseOptions} />
            <InputField label="Highest Qualification" name="highestQualification" type="select" value={formData.highestQualification} onChange={handleChange} required options={qualificationOptions} />
            <InputField label="Password" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required colSpan="col-span-1" />
            <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required colSpan="col-span-1" />

            <div className="col-span-2 flex items-center mt-2">
              <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange} required className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" style={{ accentColor: primaryBlue }} />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the <a href="#" style={{ color: primaryBlue }} className="font-medium hover:underline">Terms & Conditions</a> and{' '}
                <a href="#" style={{ color: primaryBlue }} className="font-medium hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Sign Up Button */}
            <div className="col-span-2 mt-6">
              <button type="submit" style={{ backgroundColor: primaryBlue }} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
                Sign Up
              </button>
            </div>

            {/* Continue with Google Button */}
            <div className="col-span-2 mt-4">
              <button type="button" onClick={() => alert('Google Sign-In clicked')} className="w-full flex items-center justify-center py-3 px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-50 shadow-sm transition duration-150">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.341c-1.029 3.468-3.668 5.797-7.941 6.368v7.245h9.347c5.297-5.18 8.356-12.78 8.356-22.197 0-1.46-.201-2.913-.574-4.281z"/>
                  <path fill="#FF3D00" d="M24 44c6.917 0 12.65-2.27 16.82-6.19l-9.347-7.245c-2.478 1.583-5.513 2.585-7.473 2.585-5.385 0-9.957-3.793-11.666-8.98H3.454v7.558C7.653 38.65 15.143 44 24 44z"/>
                  <path fill="#4CAF50" d="M12.334 24.364c-.188-1.558-.3-3.178-.3-4.811s.112-3.253.3-4.811V7.184H3.454c-.61 1.229-1.01 2.57-1.173 3.993C1.989 13.513 1.83 16.71 1.83 20c0 3.29.159 6.487.45 9.123.163 1.423.563 2.764 1.173 3.993l8.88-6.908z"/>
                  <path fill="#1976D2" d="M24 16.5c2.923 0 5.483 1.054 7.505 3.018l6.45-6.45C33.65 6.136 28.188 4 24 4c-8.857 0-16.347 5.35-20.546 12.816l8.88 6.908c1.709-5.187 6.281-8.98 11.666-8.98z"/>
                </svg>
                Continue with Google
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
