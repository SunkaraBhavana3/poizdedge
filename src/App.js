import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialSection from './components/TestimonialSection';
import CtaSection from './components/CtaSection';
import FooterSection from './components/FooterSection';

import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import Course from "./Pages/Course";
import Demo from "./Pages/Demo";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";

// ✅ Import your CoursePage
import CoursePage from "./components/CoursePage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
              <StatsBar />
              <FeaturesSection />
              <HowItWorksSection />
              <TestimonialSection />
              <CtaSection />
            </>
          } 
        />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        {/* ✅ This is the correct Course Details Page Route */}
        <Route path="/course-details" element={<CoursePage />} />

      </Routes>

      <FooterSection />
    </Router>
  );
}

export default App;
