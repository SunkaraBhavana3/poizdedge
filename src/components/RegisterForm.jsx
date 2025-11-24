import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    demo: "", // added demo field
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
    setError("");
    setMessage("");

    // Frontend validation including demo selection
    if (!formData.name || !formData.email || !formData.phone || !formData.profession || !formData.demo) {
      setError("All fields are required, including demo selection");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`https://poizdedgebackend.onrender.com/api/register`, formData);
      setMessage(res.data.message);
      setFormData({ name: "", email: "", phone: "", profession: "", demo: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #d3d3d3", // light gray border
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Register for Free Demo</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Profession</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px" }}
          />
        </div>

        {/* Demo selection dropdown */}
        <div style={{ marginBottom: "15px" }}>
          <label>Select Free Demo</label>
          <select
            name="demo"
            value={formData.demo}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #d3d3d3", borderRadius: "5px" }}
          >
            <option value="">-- Select Demo --</option>
            <option value="data_management">Data Management</option>
            <option value="interview">Interview</option>
            <option value="research_process">Research Process</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#0077b6",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
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
