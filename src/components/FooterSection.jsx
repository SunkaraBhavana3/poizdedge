import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import logo from '../assets/image.png';
import { Youtube } from 'react-bootstrap-icons';

const FooterSection = () => {
  const darkBlue = '#1A202C';
  const footerLinkColor = '#A0AEC0';

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Courses', to: '/courses' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  const popularCourses = [
    { name: 'Clinical Research', to: 'enrollment/ac4eeea3-e718-4416-86a6-5c55248012fe' },
    { name: 'Pharmacovigilance', to: '/enrollment/ae6e2dbd-1d5b-413d-848e-c60be92d19ac' },
    { name: 'Clinical Data Management', to: '/enrollment/4d9f530b-5b36-42ce-900b-69e872744d96' },
    { name: 'Regulatory Affairs', to: '/enrollment/2fbf5d48-dbb4-4306-baf9-0571da5fb32e' },
    { name: 'Clinical SAS Programming', to: '/enrollment/e7422798-7ff8-45db-a4ed-28a8f66cb1ae' },
    { name: 'All Courses', to: '/courses' },
  ];

  const contactDetails = [
    {
      icon: Mail,
      text: 'poizdedgeinstitute@gmail.com',
      href: 'mailto:poizdedgeinstitute@gmail.com',
    },
    {
      icon: Phone,
      text: '8714040888',
      href: 'tel:8714040888',
    },
    {
      icon: MapPin,
      text: 'Trivandrum, Kerala',
      href: '#',
    },
  ];

  const SocialIcon = ({ Icon, label }) => (
    <a
      href="#"
      aria-label={label}
      className="no-underline hover:no-underline hover:text-white transition duration-200"
      style={{ color: footerLinkColor }}
    >
      <Icon className="w-5 h-5" />
    </a>
  );

  return (
    <footer className="pt-16" style={{ backgroundColor: darkBlue, color: 'white' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-700">

          {/* Logo & Mission */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="Poizdedge Institute Logo"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <span className="text-xl font-bold">The Poizdedge Institute</span>
            </div>
            <p className="text-sm mt-4" style={{ color: footerLinkColor }}>
              Empowering students with quality education through innovative
              online learning solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-sm no-underline hover:no-underline hover:text-white transition duration-200"
                    style={{ color: footerLinkColor }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Popular Courses</h4>
            <ul className="space-y-3">
              {popularCourses.map((course, index) => (
                <li key={index}>
                  <Link
                    to={course.to}
                    className="text-sm no-underline hover:no-underline hover:text-white transition duration-200"
                    style={{ color: footerLinkColor }}
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {contactDetails.map((detail, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <detail.icon
                    className="w-5 h-5 mt-1"
                    style={{ color: footerLinkColor }}
                  />
                  <a
                    href={detail.href}
                    className="text-sm no-underline hover:no-underline hover:text-white transition duration-200"
                    style={{ color: footerLinkColor }}
                  >
                    {detail.text}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex space-x-4 mt-6">
              <a
    href="https://www.facebook.com/profile.php?id=61583533687381"
    aria-label="Facebook"
    className="no-underline hover:no-underline hover:text-white transition duration-200"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: footerLinkColor }}
  >
    <Facebook className="w-5 h-5" />
  </a>
       <a
    href="https://www.instagram.com/poizdedge_institute/reels/"
    aria-label="Instagram"
    className="no-underline hover:no-underline hover:text-white transition duration-200"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: footerLinkColor }}
  >
    <Instagram className="w-5 h-5" />
  </a>   
   <a
    href="https://www.youtube.com/@poizdedgeinstitute"
    aria-label="Youtube"
    className="no-underline hover:no-underline hover:text-white transition duration-200"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: footerLinkColor }}
  >
    <Youtube className="w-5 h-5" />
  </a>     
              
             
            </div>
          </div>
        </div>

        <div className="py-6 text-center text-sm" style={{ color: footerLinkColor }}>
          © 2025 Poizdedge Institute. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

