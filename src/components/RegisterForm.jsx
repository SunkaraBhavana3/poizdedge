import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    demo: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { name, email, phone, profession, demo } = formData;

    if (!name || !email || !phone || !profession || !demo) {
      setError("All fields are required, including demo selection.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://poizdedgebackend.onrender.com/api/register",
        formData
      );
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        profession: "",
        demo: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "90px auto",          // ⬅️ FIXED top cut
        padding: "30px 20px",         // ⬅️ extra top padding
        border: "1px solid #ccc",
        borderRadius: 10,
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: 20 }}>
        Register for Free Demo and Webinar
      </h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "profession"].map((field) => (
          <div key={field} style={{ marginBottom: 15 }}>
            <label style={{ display: "block", marginBottom: 5 }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 5,
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        {/* Demo Selection */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5 }}>
            Select Free Demo
          </label>
          <select
            name="demo"
            value={formData.demo}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 5,
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select Demo --</option>
            <option value="Pharmacovigilance">Pharmacovigilance</option>
            <option value="Clinical Research (CR)">
              Clinical Research (CR)
            </option>
            <option value="Regulatory Affairs (RA)">
              Regulatory Affairs (RA)
            </option>
            <option value="Clinical SAS Programming">
              Clinical SAS Programming
            </option>
            <option value="Clinical Data Management">
              Clinical Data Management
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#0077b6",
            color: "#ffffff",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
