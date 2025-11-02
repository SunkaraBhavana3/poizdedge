import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const primaryBlue = '#1E3A8A';

  // This removes underline on mobile menu also
  const linkStyle = { textDecoration: "none" };

  return (
    <nav className="bg-white shadow-md relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={logo}
              alt="Poizdedge Institute Logo" 
              className="w-10 h-10 rounded-full object-cover shadow-md"
            />
            <Link to="/" style={{ ...linkStyle, color: primaryBlue }} className="text-2xl font-bold">
              Poizdedge Institute
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" style={linkStyle} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Home
            </Link>
            <Link to="/about" style={linkStyle} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              About
            </Link>
            <Link to="/courses" style={linkStyle} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Courses
            </Link>
            <Link to="/demo" style={linkStyle} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Demo Classes
            </Link>
            <Link to="/contact" style={linkStyle} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Login & Sign Up */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" style={{ ...linkStyle, color: primaryBlue }} className="text-sm font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              style={{ ...linkStyle, backgroundColor: primaryBlue }}
              className="px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-3 space-y-1">
          <Link to="/" style={linkStyle} className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md">Home</Link>
          <Link to="/courses" style={linkStyle} className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md">Courses</Link>
          <Link to="/demo" style={linkStyle} className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md">Demo Classes</Link>
          <Link to="/about" style={linkStyle} className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md">About</Link>
          <Link to="/contact" style={linkStyle} className="block text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md">Contact</Link>

          <div className="pt-4 border-t border-gray-200">
            <Link to="/login" style={linkStyle} className="block text-gray-700 px-3 py-2 rounded-md">Login</Link>
            <Link
              to="/signup"
              style={{ ...linkStyle, backgroundColor: primaryBlue }}
              className="block text-center mt-2 px-4 py-2 text-white rounded-md shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
