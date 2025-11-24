// --- InstituteCheckout.jsx ---
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const InstituteCheckout = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentTab, setPaymentTab] = useState("cards");
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    country: "India",
    state: "",
  });

  const [cards, setCards] = useState({
    cardNumber: "",
    mmyy: "",
    cvv: "",
    bank: "",
  });

  const [wallet, setWallet] = useState({
    upi: "",
    wallet: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // -------------------------------------
  // Fetch course data
  // -------------------------------------
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE || "https://poizdedgebackend.onrender.com"}/api/course/${courseId}`
        );
        setCourse(res.data);
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  const handleCardsChange = (e) => {
    const { name, value } = e.target;
    setCards({ ...cards, [name]: value });
  };

  const handleWalletChange = (e) => {
    const { name, value } = e.target;
    setWallet({ ...wallet, [name]: value });
  };

  const handlePay = () => {
    if (!billing.name || !billing.email || !billing.state) {
      setPopupMessage("Please fill all billing details before proceeding!");
      setShowPopup(true);
      return;
    }
    if (paymentTab === "cards") {
      if (!cards.cardNumber || !cards.mmyy || !cards.cvv || !cards.bank) {
        setPopupMessage("Please fill all card/net banking details!");
        setShowPopup(true);
        return;
      }
    } else {
      if (!wallet.upi && !wallet.wallet) {
        setPopupMessage("Please fill UPI ID or select a wallet!");
        setShowPopup(true);
        return;
      }
    }

    setPopupMessage("Proceeding to payment...");
    setShowPopup(true);
  };

  if (loading) return <h3 className="text-center mt-5">Loading Course...</h3>;
  if (!course) return <h3 className="text-center mt-5 text-danger">Course Not Found</h3>;

  return (
    <div className="container py-5" style={{ maxWidth: "1100px" }}>
      <h2 className="fw-bold mb-4 text-center">Enroll in {course.title}</h2>

      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-7">
          <div className="card p-4 mb-4 shadow-sm rounded-4">
            <h5 className="fw-bold mb-3">Billing Details</h5>

            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                className="form-control"
                name="name"
                value={billing.name}
                onChange={handleBillingChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={billing.email}
                onChange={handleBillingChange}
                placeholder="Enter email"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Country</label>
                <select
                  className="form-select"
                  name="country"
                  value={billing.country}
                  onChange={handleBillingChange}
                >
                  <option>India</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">State (South India)</label>
                <select
                  className="form-select"
                  name="state"
                  value={billing.state}
                  onChange={handleBillingChange}
                >
                  <option value="">Select State</option>
                  <option>Andhra Pradesh</option>
                  <option>Telangana</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="card p-4 shadow-sm rounded-4">
            <h5 className="fw-bold mb-3">Payment Method</h5>

            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${paymentTab === "cards" ? "active" : ""}`}
                  onClick={() => setPaymentTab("cards")}
                >
                  Cards / Net Banking
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${paymentTab === "wallets" ? "active" : ""}`}
                  onClick={() => setPaymentTab("wallets")}
                >
                  Wallets / UPI
                </button>
              </li>
            </ul>

            {paymentTab === "cards" && (
              <>
                <input
                  className="form-control mb-2"
                  placeholder="Card Number"
                  name="cardNumber"
                  value={cards.cardNumber}
                  onChange={handleCardsChange}
                />
                <div className="row mb-2">
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="MM/YY"
                      name="mmyy"
                      value={cards.mmyy}
                      onChange={handleCardsChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="CVV"
                      name="cvv"
                      value={cards.cvv}
                      onChange={handleCardsChange}
                    />
                  </div>
                </div>

                <select
                  className="form-select"
                  name="bank"
                  value={cards.bank}
                  onChange={handleCardsChange}
                >
                  <option>Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis Bank</option>
                  <option>Kotak</option>
                </select>
              </>
            )}

            {paymentTab === "wallets" && (
              <>
                <input
                  className="form-control mb-2"
                  placeholder="Enter UPI ID"
                  name="upi"
                  value={wallet.upi}
                  onChange={handleWalletChange}
                />

                <select
                  className="form-select"
                  name="wallet"
                  value={wallet.wallet}
                  onChange={handleWalletChange}
                >
                  <option value="">Choose Wallet</option>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                  <option>Mobikwik</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <div className="card p-4 shadow-sm rounded-4">
            <h5 className="fw-bold mb-3">Order Summary</h5>

            <p><strong>Course:</strong> {course.title}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Mode:</strong> {course.mode || "Online / Recorded"}</p>

          {course.Subjects && course.Subjects.trim() !== "" && (
  <>
    <p className="fw-bold mt-3 mb-1">Subjects Included:</p>
    <p style={{ fontSize: "0.9rem" }}>{course.Subjects}</p>
  </>
)}

            <p className="fw-bold mt-3 mb-1">Description:</p>
            <p style={{ fontSize: "0.9rem" }}>{course.description}</p>

            <hr />
            <div className="d-flex justify-content-between">
              <h5>Total Payable:</h5>
              <h5 className="fw-bold">₹ {course.price}</h5>
            </div>

            <button
              className="btn btn-primary w-100 mt-4 py-2 fw-bold rounded-3"
              onClick={handlePay}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alert</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>

              <div className="modal-body">
                <p>{popupMessage}</p>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowPopup(false)}
                >
                  OK
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default InstituteCheckout;
