import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const DEMO_API = "https://poizdedgebackend.onrender.com/api/demo";
const REGISTER_API = "https://poizdedgebackend.onrender.com/api/register";

const RegisterForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    profession: "",
    demo: "",
  });

  const [demos, setDemos] = useState([]);
  const [loadingDemos, setLoadingDemos] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Pre-fill demo from URL query param (e.g. /register?demo=bindu)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preSelectedDemo = params.get("demo");
    if (preSelectedDemo) {
      setFormData((prev) => ({ ...prev, demo: decodeURIComponent(preSelectedDemo) }));
    }
  }, [location.search]);

  // Fetch demos
  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const res = await axios.get(DEMO_API);
        setDemos(res.data || []);
      } catch (err) {
        console.error("Failed to load demos:", err);
        setError("Could not load available demos.");
      } finally {
        setLoadingDemos(false);
      }
    };
    fetchDemos();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setMessage("");
    setError("");

    const { name, email, phone, profession, demo } = formData;

    if (!name || !email || !phone || !profession || !demo) {
      setError("All fields are required.");
      setLoadingSubmit(false);
      return;
    }

    try {
      const res = await axios.post(REGISTER_API, formData);
      setMessage(res.data.message || "Registration successful! 🎉");

      // Mark this demo as registered in localStorage
      if (user?.email) {
        const key = `registered_demos_${user.email}`;
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        if (!saved.includes(demo)) {
          const updated = [...saved, demo];
          localStorage.setItem(key, JSON.stringify(updated));
        }
      }

      // Reset form except email (keep prefilled)
      setFormData((prev) => ({
        ...prev,
        name: "",
        phone: "",
        profession: "",
        demo: "",
      }));

      // Optional: redirect back to home or demo page after success
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "90px auto",
        padding: "40px 25px",
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#1e3a8a" }}>
        Register for Free Demo / Webinar
      </h2>

      {message && (
        <p style={{ color: "green", textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "#e63946", textAlign: "center", fontWeight: "bold", marginBottom: 20 }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="Your profession / field"
            style={{ width: "100%", padding: 12, borderRadius: 6, border: "1px solid #ccc" }}
            required
          />
        </div>

        <div style={{ marginBottom: 30 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Select Demo / Webinar
          </label>

          {loadingDemos ? (
            <p style={{ color: "#666" }}>Loading available demos...</p>
          ) : demos.length === 0 ? (
            <p style={{ color: "#e63946" }}>No demos available right now.</p>
          ) : (
            <select
              name="demo"
              value={formData.demo}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 16,
              }}
              required
            >
              <option value="">-- Choose a Demo --</option>
              {demos.map((demo) => (
                <option key={demo._id} value={demo.name}>
                  {demo.name} ({demo.demoTime || "Time TBA"})
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          disabled={loadingSubmit || loadingDemos || demos.length === 0}
          style={{
            width: "100%",
            padding: 14,
            backgroundColor: loadingSubmit ? "#aaa" : "#0077b6",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 17,
            fontWeight: 600,
            cursor: loadingSubmit ? "not-allowed" : "pointer",
          }}
        >
          {loadingSubmit ? "Registering..." : "Register Now"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
