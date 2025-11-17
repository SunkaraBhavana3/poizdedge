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
import TrainingSection from "./components/TrainingSection";

import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import Course from "./Pages/Course";
import Demo from "./Pages/Demo";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import CoursePage from "./components/CoursePage";
import EnrollmentPage from "./components/EnrollmentPage";

// ✅ Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <div className="h-16 w-full"></div>
              <HeroSection />
              <CourseFilterBar />
              <StatsBar />
              <TrainingSection />
              <ProgramValueComparison />
              <FeaturesSection />
              <HowItWorksSection />
              <DemoSchedule />
              <TestimonialSection />
              <CtaSection />
            </>
          }
        />

        {/* Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />

        {/* Protected Course List */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <div className="h-16 w-full"></div>
              <Course />
            </ProtectedRoute>
          }
        />

        {/* Course Details */}
        <Route
          path="/course-details/:courseId"
          element={
            <ProtectedRoute>
              <div className="h-16 w-full"></div>
              <CoursePage />
            </ProtectedRoute>
          }
        />

        {/* Enrollment Page */}
        <Route
          path="/enrollment/:courseId"
          element={
            <ProtectedRoute>
              <div className="h-16 w-full"></div>
              <EnrollmentPage />
            </ProtectedRoute>
          }
        />

        {/* Other Pages */}
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
      </Routes>
      <FooterSection />
    </Router>
  );
}

export default App;
