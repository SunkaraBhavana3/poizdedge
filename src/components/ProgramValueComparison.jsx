import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "./AuthContext"; // ✅ import auth context
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EnrollModal from "./EnrollModal";

/* -------------------- PLAN DATA -------------------- */
const coursePlans = [
  {
    tier: "Self paced learning",
    price: "₹4,999",
    description:  "Flexible self-paced learning designed for beginners, allowing you to learn comfortably at your own pace.",
    keyFeature:  "Ideal for Beginners & Aspirants",
    access: "Learn at Your Own Comfort",
    support: "Pause & Restart Anytime",
  },
  {
    tier: "Intermediate",
    price: "₹9,999",
    description: "Trainer-assisted learning with live interactive sessions, doubt clearing, and progress-based assessments.",
    keyFeature: "Doubt Clearing & Assessments",
    access: "Live Interactive Sessions",
    support: "Trainer Assisted Learning",
  },
  {
    tier: "Classic",
    price: "₹14,999",
    description: "Most popular learning plan with industry and interview-focused live sessions, exclusive Q&A, and project-based assessment.",
    keyFeature: "Industry Project Based on Assessment",
    access: "Industry & Interview Focused Learning",
    support: "Live Sessions with Exclusive Q&A",
    popular: true,
  },
  {
    tier: "Premium",
    price: "₹24,999",
    description:  "Exclusive mentorship for limited candidates with focused individual guidance, skill improvement, and interview readiness.",
    keyFeature: "Interview Readiness & Soft Skills",
    access: "Exclusive Mentorship Program",
    support: "Limited Candidates – Individual Focus",
  },
];

/* -------------------- RESPONSIVE STYLES -------------------- */
const injectPlanStyles = () => {
  if (document.getElementById("choose-plan-styles")) return;

  const css = `
   .pricing-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin: 30px auto;
    max-width: 1200px;
    padding: 0 12px;
    align-items: stretch;
  }

   .pricing-card {
    background: #fff;
    padding: 30px 20px;
    border-radius: 14px;
    box-shadow: 0 8px 25px rgba(0,0,0,.05);
    border: 1px solid #e1e9f5;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease;
    width: 100%;
    height: 100%;
  }

    .pricing-card:hover { 
      transform: translateY(-6px); 
      border-color: #0b3d91; 
      box-shadow: 0 14px 30px rgba(11,61,145,0.15);
    }
    .popular-badge {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: #0b3d91;
      color: #fff;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      white-space: nowrap;
    }
    .plan-title { color: #0b3d91; font-size: clamp(1.05rem, 2.5vw, 1.2rem); font-weight:700;  }
    .price-text { font-size: clamp(1.6rem, 5vw, 2rem); font-weight: 900; color:#0b3d91; margin:10px 0;  }
    .plan-desc { font-size:0.82rem; color:#666; line-height:1.4; margin-bottom:10px; }
    .pricing-card ul { list-style:none; padding:0; margin:15px 0; flex-grow:1; }
    .pricing-card li { display:flex; gap:10px; margin-bottom:10px; font-size:0.85rem; color:#555; }
    .btn-plan-enroll {
      display:block;
      width:100%;
      padding:12px 0;
      background:#0b3d91;
      color:#fff;
      border-radius:8px;
      text-decoration:none;
      font-weight:700;
      font-size:0.95rem;
      transition:0.3s;
      border:none;
      cursor:pointer;
    }
    .btn-plan-enroll:hover { background:#083070; transform:translateY(-1px); }
    @media (max-width:480px) { .pricing-card { max-width:100%; padding:20px 16px; } .price-text { font-size:1.6rem; } }
  `;

  const style = document.createElement("style");
  style.id = "choose-plan-styles";
  style.innerHTML = css;
  document.head.appendChild(style);
};

/* -------------------- COMPONENT -------------------- */
const ChooseYourPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { user } = useAuth(); // ✅ get user
  const navigate = useNavigate();

  useEffect(() => {
    injectPlanStyles();
  }, []);

  /* -------------------- ENROLL BUTTON CLICK -------------------- */
  const handleEnrollClick = (planTier) => {
    if (!user) {
      toast.info("Please login to enroll 🔐");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    setSelectedPlan(planTier);
    setShowModal(true);
  };

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          color: "#0b3d91",
          fontSize: "clamp(1.5rem,4vw,2rem)",
          fontWeight: 800,
          marginBottom: "50px",
          marginTop: "50px",
        }}
      >
        Choose Your Plan
      </h2>

      <div className="pricing-grid-container">
        {coursePlans.map((plan) => (
          <div className="pricing-card" key={plan.tier}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3 className="plan-title">{plan.tier}</h3>
            <p className="plan-desc">{plan.description}</p>

            <ul>
              <li>
                <FaCheckCircle color="#28a745" /> {plan.access} Access
              </li>
              <li>
                <FaCheckCircle color="#28a745" /> {plan.support}
              </li>
              <li>
                <FaCheckCircle color="#28a745" /> {plan.keyFeature}
              </li>
            </ul>

            <button
              className="btn-plan-enroll"
              onClick={() => handleEnrollClick(plan.tier)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      {/* ENROLL MODAL */}
      <EnrollModal
        show={showModal}
        plan={selectedPlan}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default ChooseYourPlan;
