import React, { useState } from "react";
import axios from "axios";
// **DELETED: import brochure from './Brochure.pdf';** // The file is now accessed via its public URL.

function BrochureGate() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Define the public URL for the PDF
  const BROCHURE_URL = "/Handbook.pdf"; 

  const handleOpen = async () => {
    if (!email || !phone) {
      alert("Please enter both email and phone number");
      return;
    }

    try {
      // 1. Save details to backend
      await axios.post("https://poizdedgebackend.onrender.com/api/brochure/save", {
        email,
        phone,
      });

      // 2. SUCCESS: Open brochure in a new tab for auto-download/view
      // This uses the simple public path, resolving the webpack issue.
      window.open(BROCHURE_URL, "_blank");

      // Optional: Clear input fields
      setEmail("");
      setPhone("");
      
      alert("Details saved successfully! Opening brochure now.");


    } catch (error) {
      console.error("Error saving details:", error);
      alert("Something went wrong while saving your details. Please try again.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto", textAlign: "center" , paddingTop:'65px'}}>
      <h3>Enter Details to View Brochure</h3>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "10px 0" }}
      />

      <button
        onClick={handleOpen}
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Open Handbook
      </button>
    </div>
  );
}

export default BrochureGate;
