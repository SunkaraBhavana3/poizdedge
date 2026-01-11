import React, { useState } from 'react';
import axios from "axios";
import { CheckCircle, Phone, GraduationCap } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Reusable Input Component
const InputField = ({ label, name, type, placeholder, value, onChange, options, required = false, colSpan = "col-span-2", error }) => (
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
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md 
                   shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
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
        className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md 
                   shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      />
    )}
    {error && name !== 'email' && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

const SignUpPage = () => {
  const navigate = useNavigate(); 

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

  const [errors, setErrors] = useState({});

  const courseOptions = ['Select a course','Clinial Research','Pharmacovigilance','Clinical SAS Programming','Clinical Data Management','Regulatory Affairs'];
  const qualificationOptions = ['Select qualification','High School','Associate Degree',"Bachelor's Degree","Master's Degree",'Ph.D.'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      formData.firstName.trim() === "" &&
      formData.lastName.trim() === "" &&
      formData.email.trim() === "" &&
      formData.phoneNumber.trim() === "" &&
      formData.password.trim() === "" &&
      formData.confirmPassword.trim() === ""
    ) {
      toast.error("All fields are mandatory. Please fill the form.");
      return false;
    }

    for (const key in formData) {
      const value = formData[key];
      if (key !== 'email' && typeof value === 'string' && value.trim() === '') {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        isValid = false;
      } else if (key === 'email' && value.trim() === '') {
        newErrors[key] = `Email is required.`; 
        isValid = false;
      }

      if (key === 'courseOfInterest' && value === 'Select a course') {
        newErrors[key] = 'Please select a course.';
        isValid = false;
      }
      if (key === 'highestQualification' && value === 'Select qualification') {
        newErrors[key] = 'Please select your highest qualification.';
        isValid = false;
      }

      if (key === 'email' && value.trim() !== '' && !emailRegex.test(value)) {
        newErrors[key] = 'Please enter a valid email address.';
        isValid = false;
      }

      if (key === 'phoneNumber' && value.trim() !== '' && !/^\d{10,}$/.test(value.replace(/\s/g, ''))) {
        newErrors[key] = 'Please enter a valid phone number (min 10 digits).';
        isValid = false;
      }

      if (key === 'password' && value.length < 8) {
        newErrors[key] = 'Password must be at least 8 characters long.';
        isValid = false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!formData.agreeToTerms) {
      toast.error('You must agree to the Terms & Conditions and Privacy Policy.');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    // 1️⃣ Prepare data for backend
    const backendData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,          // match backend
      courseOfInterest: formData.courseOfInterest, // match backend
      highestQualification: formData.highestQualification // match backend
    };

    // 2️⃣ Send data to backend first
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      backendData
    );

    if (res.data.message.includes("Signup successful")) {
      // 3️⃣ Only create Firebase user if backend succeeded
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      toast.success("Signup successful!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error(res.data.message || "Signup failed!");
    }

  } catch (err) {
    // Handle errors from backend or Firebase
    if (err.response?.data?.message) {
      toast.error(err.response.data.message); // backend error
    } else if (err.code) {
      toast.error(err.message); // Firebase error
    } else {
      toast.error("Signup failed!");
    }
  }
};

  return (
    <div className="min-h-screen font-sans pt-16" style={{ backgroundColor: lightGrayBackground }}>
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto my-8 bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <GraduationCap style={{ color: primaryBlue }} className="w-8 h-8" />
              <h1 className="text-2xl font-bold" style={{ color: darkBlue }}>The Poizdedge Institute</h1>
            </div>
            <h2 className="text-4xl font-extrabold mb-6" style={{ color: darkBlue }}>Start Your Journey to Success</h2>
            <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>
              Join thousands of students who have transformed their careers with our programs.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Access to all course materials',
                'Priority admission and batch selection',
                'Career counseling and placement support',
                'Alumni network access',
                'Lifetime course updates'
              ].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3 text-base" style={{ color: secondaryTextColor }}>
                  <CheckCircle className="w-6 h-6" style={{ color: primaryBlue }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg mt-8" style={{ backgroundColor: lightGrayBackground }}>
            <h4 className="font-semibold mb-2" style={{ color: darkBlue }}>Need Help?</h4>
            <p className="text-sm mb-3" style={{ color: secondaryTextColor }}>Our admissions team is available to assist you</p>
            <a href="tel:+919876543210" className="flex items-center space-x-2 text-sm font-medium" style={{ color: primaryBlue }}>
              <Phone className="w-4 h-4" />
              <span>Call: +91 8714040888</span>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: darkBlue }}>Create Account</h2>
          <p className="text-sm text-gray-600 mb-8">
            Already have an account?{" "}
            <Link to="/login" style={{ color: primaryBlue }} className="font-medium hover:underline">
              Sign In
            </Link>
          </p>

          <form className="grid grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleSubmit}>
            <InputField label="First Name" name="firstName" type="text" placeholder="John" value={formData.firstName} onChange={handleChange} required colSpan="col-span-1" error={errors.firstName} />
            <InputField label="Last Name" name="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={handleChange} required colSpan="col-span-1" error={errors.lastName} />
            <InputField label="Email Address" name="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required error={errors.email} />
            <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+91 98765 43210" value={formData.phoneNumber} onChange={handleChange} required error={errors.phoneNumber} />
            <InputField label="Course Interested In" name="courseOfInterest" type="select" value={formData.courseOfInterest} onChange={handleChange} required options={courseOptions} error={errors.courseOfInterest} />
            <InputField label="Highest Qualification" name="highestQualification" type="select" value={formData.highestQualification} onChange={handleChange} required options={qualificationOptions} error={errors.highestQualification} />
            <InputField label="Password" name="password" type="password" placeholder="********" value={formData.password} onChange={handleChange} required colSpan="col-span-1" error={errors.password} />
            <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="********" value={formData.confirmPassword} onChange={handleChange} required colSpan="col-span-1" error={errors.confirmPassword} />

            <div className="col-span-2 flex items-center mt-2">
              <input id="agreeToTerms" name="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} 
                onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" style={{ color: primaryBlue }} className="font-medium hover:underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: primaryBlue }} className="font-medium hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="col-span-2 mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md text-lg font-medium text-white"
                style={{ backgroundColor: primaryBlue }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
