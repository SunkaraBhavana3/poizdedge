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
import TrainingSection from "./components/TrainingSection";

import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import Course from "./Pages/Course";
import Demo from "./Pages/Demo";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import EnrollmentForm from "./components/EnrollmentForm";
import CourseDetails from "./CourseDetails";
import Curriculum from "./components/Curriculum";
import QuizPage from "./components/QuizPage";
// <-- import QuizPage

import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./Pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
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

          {/* Authentication */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Courses */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <div className="h-16 w-full"></div>
                <Course />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course-details/:courseId"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />

          {/* Quiz Page Route */}
          <Route
            path="/course-details/:courseId/quiz/:moduleId"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          {/* Enrollment */}
          <Route
            path="/enrollment/:courseId"
            element={
              <ProtectedRoute>
                <div className="h-16 w-full"></div>
                <EnrollmentForm />
              </ProtectedRoute>
            }
          />

          {/* Demo / About / Contact */}
          <Route path="/demo" element={<Demo />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <div className="h-16 w-full"></div>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[80vh]">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
      <FooterSection />
    </Router>
  );
}

export default App;
