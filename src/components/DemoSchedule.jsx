import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import "./DemoSchedule.css";

const DEMO_API = "https://poizdedgebackend.onrender.com/api/demo";
const REGISTER_CHECK_API = "https://poizdedgebackend.onrender.com/api/register/my-demos";

// ✅ STATIC COMPLETED SEMINAR
const staticDemos = [
  {
    _id: "static-1",
    name: "Clinical Research Careers 2026: What to Choose & How to Crack Interviews",
    institute: "The PoizdEdge Institute For Clinical Excellence",
    description: "Get Interview-Ready in 60 Minutes",
    date: "24th March 2026, Wednesday",
    time: "11:00 AM to 12:00 PM",
    platform: "Google Meet",
  },
];

const DemoSchedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [demos, setDemos] = useState([]);
  const [registeredDemos, setRegisteredDemos] = useState([]);
  const [loadingDemos, setLoadingDemos] = useState(true);
  const [loadingRegistered, setLoadingRegistered] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch backend demos
  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const res = await axios.get(DEMO_API);
        setDemos(res.data || []);
      } catch (err) {
        setError("Unable to load upcoming demo sessions.");
      } finally {
        setLoadingDemos(false);
      }
    };
    fetchDemos();
  }, []);

  // 🔹 Fetch registered demos
  useEffect(() => {
    if (!user?.email) {
      setLoadingRegistered(false);
      return;
    }

    const fetchRegistered = async () => {
      try {
        const res = await axios.get(
          `${REGISTER_CHECK_API}?email=${encodeURIComponent(user.email)}`
        );
        if (res.data.success) {
          setRegisteredDemos(res.data.registeredDemos || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingRegistered(false);
      }
    };

    fetchRegistered();
  }, [user?.email]);

  // 🔹 Register handler
  const handleRegisterClick = (demo) => {
    if (!user) {
      toast.info("Please login to register 🔐");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (registeredDemos.includes(demo.name)) {
      toast.info(`Already registered for "${demo.name}"`);
      return;
    }

    navigate(`/register?demo=${encodeURIComponent(demo.name)}`);
  };

  const isLoading = loadingDemos || loadingRegistered;

  return (
    <div className="demo-schedule-section" id="demo">

      {/* 🔥 COMPLETED */}
      <h2 className="schedule-header">🎓 Recent Seminar</h2>

      <div className="demo-list-container">
        {staticDemos.map((demo) => (
          <div key={demo._id} className="demo-item completed-card">
            <div className="demo-info">
              <span className="demo-icon">🎥</span>
              <div>
                <p>{demo.name}</p>
                <span className="demo-time">{demo.institute}</span>
                <span className="demo-time">📅 {demo.date}</span>
                <span className="demo-time">⏰ {demo.time}</span>
                <span className="demo-time">💻 {demo.platform}</span>
              </div>
            </div>

            <button className="register-button completed-btn">
              Completed
            </button>
          </div>
        ))}
      </div>

      {/* 🚀 UPCOMING */}
      {/* <h2 className="schedule-header pt-5">🎉 Upcoming Live Demos</h2>

      {isLoading && <div className="loading">Loading...</div>}

      {error && !isLoading && <div className="error">{error}</div>}

      {!isLoading && !error && demos.length === 0 && (
        <div className="loading">No upcoming sessions</div>
      )}

      {!isLoading && !error && demos.length > 0 && (
        <div className="demo-list-container">
          {demos.map((demo) => {
            const demoName = demo.name?.trim() || "Demo Session";
            const isReg = registeredDemos.includes(demoName);

            return (
              <div key={demo._id} className="demo-item">
                <div className="demo-info">
                  <span className="demo-icon">📅</span>
                  <div>
                    <p>{demoName}</p>
                    <span className="demo-time">
                      {demo.demoTime || "Time to be announced"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRegisterClick(demo)}
                  disabled={isReg}
                  className={`register-button ${
                    isReg ? "registered" : ""
                  }`}
                >
                  {isReg ? "Registered ✓" : "Register Now →"}
                </button>
              </div>
            );
          })}
        </div>
      )} */}
    </div>
  );
};

export default DemoSchedule;
