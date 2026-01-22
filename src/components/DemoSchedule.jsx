import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import "./DemoSchedule.css";

const DEMO_API = "https://poizdedgebackend.onrender.com/api/demo";
const REGISTER_CHECK_API = "https://poizdedgebackend.onrender.com/api/register/my-demos";

const DemoSchedule = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [demos, setDemos] = useState([]);
  const [registeredDemos, setRegisteredDemos] = useState([]);
  const [loadingDemos, setLoadingDemos] = useState(true);
  const [loadingRegistered, setLoadingRegistered] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all available demos
  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const res = await axios.get(DEMO_API);
        setDemos(res.data || []);
      } catch (err) {
        console.error("Failed to fetch demos:", err);
        setError("Unable to load upcoming demo sessions.");
      } finally {
        setLoadingDemos(false);
      }
    };
    fetchDemos();
  }, []);

  // Fetch user's registered demos (only if logged in)
  useEffect(() => {
    if (!user?.email) {
      setLoadingRegistered(false);
      return;
    }

    const fetchRegistered = async () => {
      try {
        const res = await axios.get(`${REGISTER_CHECK_API}?email=${encodeURIComponent(user.email)}`);
        if (res.data.success) {
          setRegisteredDemos(res.data.registeredDemos || []);
        }
      } catch (err) {
        console.error("Failed to fetch registered demos:", err);
        // Don't block UI — just log error
      } finally {
        setLoadingRegistered(false);
      }
    };

    fetchRegistered();
  }, [user?.email]);

  const handleRegisterClick = (demoName) => {
    if (!user) {
      toast.info("Please login to register for the demo 🔐");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (registeredDemos.includes(demoName)) {
      toast.info(`You are already registered for "${demoName}"!`);
      return;
    }

    // Go to registration form with demo pre-selected
    navigate(`/register?demo=${encodeURIComponent(demoName)}`);
  };

  const isRegistered = (demoName) => registeredDemos.includes(demoName);

  const isLoading = loadingDemos || loadingRegistered;

  return (
    <div className="demo-schedule-section" id="demo">
      <h2 className="schedule-header">
        🎉 Try Before You Buy: Free Live Demos and Webinars
      </h2>

      {isLoading && (
        <div className="loading-message text-center py-8 text-gray-600">
          Loading demo sessions...
        </div>
      )}

      {error && !isLoading && (
        <div className="error-message text-center py-8 text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && demos.length === 0 && (
        <div className="no-demos-message text-center py-8 text-gray-600">
          No upcoming demo sessions scheduled at the moment.<br />
          Please check back later!
        </div>
      )}

      {!isLoading && !error && demos.length > 0 && (
        <div className="demo-list-container space-y-4">
          {demos.map((demo) => {
            const demoName = demo.name?.trim() || "Demo Session";
            const isReg = isRegistered(demoName);

            return (
              <div
                key={demo._id}
                className="demo-item bg-white rounded-lg shadow p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="demo-info flex items-start gap-4">
                  <span className="demo-icon text-4xl">📅</span>
                  <div>
                    <p className="font-semibold text-xl">{demoName}</p>
                    <p className="text-gray-600 mt-1">
                      {demo.demoTime || "Time to be announced"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRegisterClick(demoName)}
                  disabled={isReg}
                  className={`register-button px-6 py-3 rounded-full font-medium min-w-[160px] text-center transition-all ${
                    isReg
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                  aria-label={isReg ? "Already registered" : `Register for ${demoName}`}
                >
                  {isReg ? "Registered ✓" : "Register Now →"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DemoSchedule;

