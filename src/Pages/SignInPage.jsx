import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

// --- Configuration & Constants ---
const primaryBlue = '#2B6CB0';
const darkBlue = '#1A365D';
const lightBlueBackground = '#EBF4FF';
const inputBg = '#F7FAFC';

// --- 1. Input Field Component ---
const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div className="w-full mb-4">
    <label htmlFor={name} className="block text-sm font-semibold mb-2 text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      style={{ backgroundColor: inputBg }}
      className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
    />
  </div>
);



// --- 3. Login Form ---
const LoginForm = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert(`Login attempted: ${formData.email}`);
  };
  const handleGoogleSignIn = () => alert('Google Sign-In clicked');

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: lightBlueBackground }}>
      <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <GraduationCap className="w-12 h-12 mx-auto text-blue-600 mb-2" />
          <h2 className="text-xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Sign in to your EduMaster account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: primaryBlue }}
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-xs">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition duration-150 shadow-sm"
        >
          Continue with Google
        </button>

        <p className="text-gray-600 mt-4 text-sm text-center">
          Don't have an account?{' '}
          <button onClick={() => setCurrentView('signup')} className="text-blue-600 font-medium hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

// --- 4. SignUp Form ---
const SignUpForm = ({ setCurrentView }) => (
  <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: lightBlueBackground }}>
    <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-xl text-center">
      <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Your EduMaster Account</h2>
      <p className="text-gray-600 mb-6">Full sign-up form will go here!</p>
      <button
        onClick={() => setCurrentView('login')}
        className="w-full py-2 rounded-lg text-white font-semibold"
        style={{ backgroundColor: primaryBlue }}
      >
        Back to Login
      </button>
    </div>
  </div>
);

// --- 5. Simple Placeholder View ---
const SimpleView = ({ title }) => (
  <div className="max-w-4xl mx-auto p-8 my-10 bg-white rounded-xl shadow-lg text-center min-h-[500px] flex flex-col items-center justify-center">
    <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{title}</h1>
    <p className="text-lg max-w-xl text-gray-600">This is a placeholder page content.</p>
  </div>
);

// --- 6. Main App Component ---
const App = () => {
  const [currentView, setCurrentView] = useState('login');

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm setCurrentView={setCurrentView} />;
      case 'signup':
        return <SignUpForm setCurrentView={setCurrentView} />;
      case 'home':
        return <SimpleView title="Home Page" />;
      case 'courses':
        return <SimpleView title="Courses Catalogue" />;
      case 'about':
        return <SimpleView title="About Us" />;
      case 'contact':
        return <SimpleView title="Contact Information" />;
      default:
        return <LoginForm setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <main>{renderView()}</main>
    </div>
  );
};

export default App;
