import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import EnrollModal from "./EnrollModal"; // Make sure path is correct

/* -------------------- PLAN DATA -------------------- */
const coursePlans = [
  {
    tier: "Online",
    price: "₹4,999",
    description: "Ideal for beginners who need flexible, self-paced access.",
    keyFeature: "Self-paced flexibility",
    access: "3 Months",
    support: "Community Forums",
  },
  {
    tier: "Intermediate",
    price: "₹9,999",
    description: "Structured learning with basic instructor support.",
    keyFeature: "Structured Learning Path",
    access: "6 Months",
    support: "Email / Chat Support",
  },
  {
    tier: "Classic",
    price: "₹14,999",
    description: "Our most popular option including live classes.",
    keyFeature: "Live Classes & Doubt Clearing",
    access: "9 Months",
    support: "Dedicated Mentor",
    popular: true,
  },
  {
    tier: "Premium",
    price: "₹24,999",
    description: "Ultimate package with 1:1 mentorship and placement.",
    keyFeature: "1:1 Mentorship & Placement",
    access: "1 Year + Lifetime",
    support: "Personal Coach",
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
      max-width: 280px;
      margin: auto;
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

  useEffect(() => {
    injectPlanStyles();
  }, []);

  const handleEnrollClick = (planTier) => {
    setSelectedPlan(planTier);
    setShowModal(true);
  };

  return (
    <>
      <h2 style={{
        textAlign:"center", color:"#0b3d91",
        fontSize:"clamp(1.5rem,4vw,2rem)", fontWeight:800, marginBottom:"50px",
        marginTop:"50px"
      }}>
        Choose Your Plan
      </h2>

      <div className="pricing-grid-container">
        {coursePlans.map((plan) => (
          <div className="pricing-card" key={plan.tier}>
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            <h3 className="plan-title">{plan.tier}</h3>
            <p className="plan-desc">{plan.description}</p>

            <ul>
              <li><FaCheckCircle color="#28a745" /> {plan.access} Access</li>
              <li><FaCheckCircle color="#28a745" /> {plan.support}</li>
              <li><FaCheckCircle color="#28a745" /> {plan.keyFeature}</li>
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

