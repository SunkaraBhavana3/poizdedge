import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import institutelogo2 from "../assets/image.png";
import { Menu, X } from "lucide-react";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileWhyUsOpen, setMobileWhyUsOpen] = useState(false);
  const [desktopWhyUsOpen, setDesktopWhyUsOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const primaryBlue = "#1E3A8A";

  const closeMenu = () => {
    setIsOpen(false);
    setMobileWhyUsOpen(false);
    setDesktopWhyUsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/login");
  };

  /* ================== SMOOTH SCROLL HELPERS ================== */

  const scrollToSection = (path, id) => {
    closeMenu();
    if (window.location.pathname !== path) {
      navigate(path);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ================== CLASSES ================== */

  const navLinkClass =
    "cursor-pointer no-underline font-medium text-blue-600 hover:text-blue-700 transition-colors";

  const mobileLinkClass =
    "block w-full py-2 text-base font-medium text-blue-600 no-underline hover:text-blue-700 transition-colors cursor-pointer";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

         {/* LOGO */}
<div className="flex items-center space-x-3"> {/* Increased space-x for better balance */}
  <img
    src={institutelogo2}
    alt="Poizdedge Institute Logo"
    // Increased from w-10 h-10 to w-14 h-14
    className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-sm" 
  />
  <Link
    to="/"
    onClick={closeMenu}
    className="text-xl md:text-2xl font-bold no-underline tracking-tight"
    style={{ color: primaryBlue }}
  >
    Poizdedge Institute
  </Link>
</div>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass}>Home</Link>
            <Link to="/about" className={navLinkClass}>About</Link>
            <Link to="/courses" className={navLinkClass}>Courses</Link>

            <span
              onClick={() => scrollToSection("/", "demo")}
              className={navLinkClass}
            >
              Demo Class
            </span>

           {/* WHY US - HOVER VERSION */}
<div 
  className="relative group h-full flex items-center"
  onMouseEnter={() => setDesktopWhyUsOpen(true)}
  onMouseLeave={() => setDesktopWhyUsOpen(false)}
>
  <button
    className={`${navLinkClass} flex items-center gap-1 h-full`}
  >
    Why Us
    <span className={`text-sm transition-transform duration-200 ${desktopWhyUsOpen ? "rotate-180" : ""}`}>
      ▾
    </span>
  </button>

  {/* Dropdown Menu */}
  <div 
    className={`absolute left-0 top-[100%] w-48 bg-white border rounded-md shadow-xl z-50 transition-all duration-200 transform ${
      desktopWhyUsOpen 
        ? "opacity-100 translate-y-0 visible" 
        : "opacity-0 -translate-y-2 invisible"
    }`}
  >
    <div className="py-2">
      <span
        onClick={() => scrollToSection("/about", "faculty")}
        className="block px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer"
      >
        Expert Faculty
      </span>
      <span
        onClick={() => scrollToSection("/", "testimonials")}
        className="block px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors cursor-pointer"
      >
        Testimonials
      </span>
    </div>
  </div>
</div>
            <Link to="/contact" className={navLinkClass}>Contact</Link>
          </div>

          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className={navLinkClass}>Login</Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white rounded-md no-underline"
                  style={{ backgroundColor: primaryBlue }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-700">Hi, {user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-200"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden transition-all duration-300 bg-white border-t border-gray-200 ${
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">

          <Link onClick={closeMenu} to="/" className={mobileLinkClass}>Home</Link>
          <Link onClick={closeMenu} to="/about" className={mobileLinkClass}>About</Link>
          <Link onClick={closeMenu} to="/courses" className={mobileLinkClass}>Courses</Link>

          <span
            onClick={() => scrollToSection("/", "demo")}
            className={mobileLinkClass}
          >
            Demo Class
          </span>

          {/* MOBILE WHY US */}
          <div>
            <span
              onClick={() => setMobileWhyUsOpen(!mobileWhyUsOpen)}
              className={mobileLinkClass}
            >
              Why Us ▾
            </span>

            {mobileWhyUsOpen && (
              <div className="pl-4">
                <span
                  onClick={() => scrollToSection("/about", "faculty")}
                  className={mobileLinkClass}
                >
                  Expert Faculty
                </span>
                <span
                  onClick={() => scrollToSection("/", "testimonials")}
                  className={mobileLinkClass}
                >
                  Testimonials
                </span>
              </div>
            )}
          </div>

          <Link onClick={closeMenu} to="/contact" className={mobileLinkClass}>Contact</Link>

          {/* ================= MOBILE AUTH ================= */}
          <div className="pt-4 mt-2 border-t border-gray-200 space-y-3">
            {!user ? (
              <>
                <Link onClick={closeMenu} to="/login" className={mobileLinkClass}>
                  Login
                </Link>
                <Link
                  onClick={closeMenu}
                  to="/signup"
                  className="block w-full text-center px-4 py-3 text-white rounded-md font-medium no-underline"
                  style={{ backgroundColor: primaryBlue }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-700">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


