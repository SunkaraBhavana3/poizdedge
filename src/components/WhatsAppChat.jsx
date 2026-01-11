import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

const SocialFloat = () => {
  const [hover, setHover] = useState(null);

  const whatsappLink =
    "https://wa.me/918714040888?text=Hi%20I%20want%20details%20about%20Clinical%20Research%20courses%20at%20The%20Poizdedge%20Institute%20for%20Clinical%20Excellence";

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        {/* ================= WHATSAPP ================= */}
        <div
          onMouseEnter={() => setHover("whatsapp")}
          onMouseLeave={() => setHover(null)}
          style={{ position: "relative" }}
        >
          <div
            style={{
              backgroundColor: "#25D366",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            <FaWhatsapp size={32} color="#fff" />
          </div>

          {hover === "whatsapp" && (
            <div
              style={{
                position: "absolute",
                right: "75px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "280px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                padding: "15px"
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                👋 Welcome to Poizdedge Institute
              </p>

              <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                Chat with us about Clinical Research courses.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  background: "#25D366",
                  color: "#fff",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  marginBottom: "10px"
                }}
              >
                💬 Chat on WhatsApp
              </a>

              <a
                href="https://whatsapp.com/channel/0029Vb7d4yYBadmQsdZg160b"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  background: "#f2f2f2",
                  color: "#333",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "8px",
                  textDecoration: "none"
                }}
              >
                📢 Follow WhatsApp Channel
              </a>
            </div>
          )}
        </div>

        {/* ================= INSTAGRAM ================= */}
        <div
          onMouseEnter={() => setHover("instagram")}
          onMouseLeave={() => setHover(null)}
          style={{ position: "relative" }}
        >
          <div
            style={{
              background:
                "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            <FaInstagram size={30} color="#fff" />
          </div>

          {hover === "instagram" && (
            <div
              style={{
                position: "absolute",
                right: "75px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "260px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                padding: "15px",
                textAlign: "center"
              }}
            >
              <p style={{ fontWeight: "bold" }}>📸 Follow us on Instagram</p>
              <a
                href="https://www.instagram.com/poizdedge_institute/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  marginTop: "10px",
                  background:
                    "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  textDecoration: "none"
                }}
              >
                Open Instagram
              </a>
            </div>
          )}
        </div>

        {/* ================= FACEBOOK ================= */}
        <div
          onMouseEnter={() => setHover("facebook")}
          onMouseLeave={() => setHover(null)}
          style={{ position: "relative" }}
        >
          <div
            style={{
              background: "#1877F2",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            <FaFacebookF size={28} color="#fff" />
          </div>

          {hover === "facebook" && (
            <div
              style={{
                position: "absolute",
                right: "75px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "240px",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
                padding: "15px",
                textAlign: "center"
              }}
            >
              <p style={{ fontWeight: "bold" }}>👍 Follow us on Facebook</p>
              <a
                href="https://www.facebook.com/profile.php?id=61583533687381"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  marginTop: "10px",
                  background: "#1877F2",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "8px",
                  textDecoration: "none"
                }}
              >
                Open Facebook
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SocialFloat;
