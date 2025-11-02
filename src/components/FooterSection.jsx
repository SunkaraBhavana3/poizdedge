import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/logo.png';

const FooterSection = () => {

    const darkBlue = '#1A202C'; // Background color
    const footerLinkColor = '#A0AEC0'; // Link color

    const quickLinks = [
        { name: 'Home', href: '#' },
        { name: 'Courses', href: '#' },
        { name: 'Demo Classes', href: '#' },
        { name: 'About Us', href: '#' },
        { name: 'Contact', href: '#' },
    ];

    const popularCourses = [
        { name: 'Mathematics', href: '#' },
        { name: 'Science', href: '#' },
        { name: 'English', href: '#' },
        { name: 'All Courses', href: '#' },
    ];

    const contactDetails = [
        { icon: Mail, text: 'info@edumaster.com', href: 'mailto:info@edumaster.com' },
        { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { icon: MapPin, text: '123 Education St, Learning City', href: '#' },
    ];

    const SocialIcon = ({ Icon, label }) => (
        <a
            href="#"
            aria-label={label}
            className="hover:text-white transition duration-200"
            style={{ color: footerLinkColor }}
        >
            <Icon className="w-5 h-5" />
        </a>
    );

    return (
        <footer className="pt-16" style={{ backgroundColor: darkBlue, color: 'white' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-700">
                    
                    {/* Column 1: Logo and Mission */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={logo}
                                alt="The Poizdedge Institute Logo"
                                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/80x80/3B82F6/ffffff?text=Logo";
                                }}
                            />
                            <span className="text-xl font-bold leading-tight">The Poizdedge Institute</span>
                        </div>
                        <p className="text-sm mt-4" style={{ color: footerLinkColor }}>
                            Empowering students with quality education through innovative online learning solutions.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-white transition duration-200"
                                        style={{ color: footerLinkColor }}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Popular Courses */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Popular Courses</h4>
                        <ul className="space-y-3">
                            {popularCourses.map((course, index) => (
                                <li key={index}>
                                    <a
                                        href={course.href}
                                        className="text-sm hover:text-white transition duration-200"
                                        style={{ color: footerLinkColor }}
                                    >
                                        {course.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            {contactDetails.map((detail, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <detail.icon
                                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                                        style={{ color: footerLinkColor }}
                                    />
                                    <a
                                        href={detail.href}
                                        className="text-sm hover:text-white transition duration-200"
                                        style={{ color: footerLinkColor }}
                                    >
                                        {detail.text}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 mt-6">
                            <SocialIcon Icon={Facebook} label="Facebook" />
                            <SocialIcon Icon={Twitter} label="Twitter" />
                            <SocialIcon Icon={Instagram} label="Instagram" />
                            <SocialIcon Icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>
                </div>

                {/* Copyright Row */}
                <div className="py-6 text-center text-sm" style={{ color: footerLinkColor }}>
                    &copy; 2025 EduMaster Academy. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
