// --- InstituteCheckout.jsx ---
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const InstituteCheckout = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "", // ✅ Added state field
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // --------------------------------------------------
  // Fetch course details
  // --------------------------------------------------
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

  // --------------------------------------------------
  // Handle Enrollment Submit
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      course: course.title, // Auto attach course
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE || "https://poizdedgebackend.onrender.com"}/api/enroll`,
        payload
      );

      setPopupMessage("Enrollment Successful!");
      setShowPopup(true);

      // Reset form
      setFormData({ name: "", phone: "", email: "", state: "" });
    } catch (error) {
      console.error(error);
      setPopupMessage("Something went wrong. Try again!");
      setShowPopup(true);
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading Course...</h3>;
  if (!course) return <h3 className="text-center mt-5 text-danger">Course Not Found</h3>;

  return (
    <div className="container py-5" style={{ maxWidth: "1100px" }}>
      <h2 className="fw-bold mb-4 text-center">Enroll in {course.title}</h2>

      <div className="row g-4">

        {/* LEFT — Enrollment Form */}
        <div className="col-lg-7">
          <div className="card p-4 shadow-sm rounded-4">
            <h5 className="fw-bold mb-3">Fill Your Details</h5>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* State */}
              <div className="mb-3">
                <label className="form-label">State</label>
                <select
                  className="form-control"
                  required
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                >
                  <option value="">Select your state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>

              {/* Course (Readonly) */}
              <div className="mb-3">
                <label className="form-label fw-bold">Course</label>
                <input
                  type="text"
                  className="form-control"
                  value={course.title}
                  readOnly
                />
              </div>

              <button className="btn btn-primary w-100 py-2 fw-bold">
                Submit Enrollment
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT — Course Summary */}
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
          </div>
        </div>

      </div>

      {/* Popup */}
      {showPopup && (
        <div className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Alert</h5>
                <button className="btn-close" onClick={() => setShowPopup(false)}></button>
              </div>

              <div className="modal-body">
                <p>{popupMessage}</p>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowPopup(false)}>
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
