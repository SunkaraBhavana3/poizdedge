import React, { useState } from "react";
import axios from "axios";

const EnrollModal = ({ show, onClose, plan }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://poizdedgebackend.onrender.com/api/studentlead/create", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        plan: plan,
      });

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Enroll for {plan}</h2>

        {success ? (
          <>
            <p style={{ color: "green" }}>
              Your enrollment is successful. Our team will contact you.
            </p>
            <button onClick={onClose} style={btn}>Close</button>
          </>
        ) : (
          <>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              style={input}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              style={input}
            />

            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              style={input}
            />

            <button onClick={submitHandler} style={btn}>
              {loading ? "Submitting..." : "Confirm Enrollment"}
            </button>

            <button onClick={onClose} style={closeBtn}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modal = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "420px",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  background: "#007bff",
  color: "#fff",
  padding: "12px",
  border: "none",
  borderRadius: "6px",
  width: "100%",
  marginTop: "10px",
  cursor: "pointer",
};

const closeBtn = {
  background: "#ccc",
  padding: "10px",
  border: "none",
  width: "100%",
  marginTop: "10px",
  borderRadius: "6px",
};

export default EnrollModal;
