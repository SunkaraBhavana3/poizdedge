import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CourseFilterBar from "./components/CourseFilterBar";
import StatsBar from "./components/StatsBar"; // LIVE stats
import DemoSchedule from "./components/DemoSchedule";
import ProgramValueComparison from "./components/ProgramValueComparison";
import HowItWorksSection from "./components/HowItWorksSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialSection from "./components/TestimonialSection";
import CtaSection from "./components/CtaSection";
import FooterSection from "./components/FooterSection";
import TrainingSection from "./components/TrainingSection";
import ResetPassword from "./components/ResetPassword";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import Course from "./Pages/Course";
import Demo from "./Pages/Demo";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import EnrollmentForm from "./components/EnrollmentForm";
import CourseDetails from "./CourseDetails";
import QuizPage from "./components/QuizPage";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import BrochureAccess from "./components/BrochureAccess";
import DownloadSidebar from "./components/DownloadSildebar";
import AdminRoute from "./components/AdminRoute";
import './App.css';
import WhatsAppChat from "./components/WhatsAppChat";

function App() {
  return (
    <Router>
      <Navbar />
        {/* ✅ WhatsApp visible on ALL pages */}
      <WhatsAppChat />
        <Routes>

          {/* ================= HOME PAGE ================= */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <CourseFilterBar />
                <StatsBar /> {/* LIVE auto-updating stats */}
                <DownloadSidebar/>
                <TrainingSection />
                <ProgramValueComparison />
                <FeaturesSection />
                <HowItWorksSection />
                <DemoSchedule />
                <WhatsAppChat/>
                <TestimonialSection />
                <CtaSection />
              </>
            }
          />

          {/* ================= AUTH ================= */}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/brochure" element={<BrochureAccess />} />

          {/* ================= COURSES (Protected) ================= */}
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

          <Route
            path="/course-details/:courseId/quiz/:moduleId"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/enrollment/:courseId"
            element={
              <ProtectedRoute>
                <div className="h-16 w-full"></div>
                <EnrollmentForm />
              </ProtectedRoute>
            }
          />

          {/* ================= DEMO (Protected) ================= */}
          <Route
            path="/demo"
            element={
              <ProtectedRoute>
                <Demo />
              </ProtectedRoute>
            }
          />

          {/* ================= PAGES ================= */}
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />

          {/* ================= ADMIN (Protected) ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <div className="h-16 w-full"></div>
                <AdminDashboard />
</AdminRoute>            }
          />

          {/* ================= 404 ================= */}
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[80vh]">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />

        </Routes>

      <FooterSection />
    </Router>
  );
}

export default App;
