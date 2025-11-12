import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CourseFilterBar from "./components/CourseFilterBar";
import StatsBar from "./components/StatsBar";
import DemoSchedule from "./components/DemoSchedule";
import ProgramValueComparison from "./components/ProgramValueComparison";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialSection from "./components/TestimonialSection";
import CtaSection from "./components/CtaSection";
import FooterSection from "./components/FooterSection";
import "./App.css";

import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import Course from "./Pages/Course";
import Demo from "./Pages/Demo";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import CoursePage from "./components/CoursePage";

// ✅ Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CourseFilterBar />
              <StatsBar />
              <ProgramValueComparison />
              <FeaturesSection />
              <HowItWorksSection />
              <DemoSchedule />
              <TestimonialSection />
              <CtaSection />
            </>
          }
        />

        {/* 🔑 Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />

        {/* 📚 Protected Course Route */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          }
        />

        {/* Other Pages */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/course-details" element={<CoursePage />} />
      </Routes>
      <FooterSection />
    </Router>
  );
}

export default App;
