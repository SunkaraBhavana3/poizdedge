// src/Pages/SignInPage.jsx
import React, { useState } from "react";
import { auth } from "../firebase"; // your firebase config
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // --------------------------
  // LOGIN HANDLER
  // --------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful 🎉");

      // ✅ Redirect back to the page user wanted, or to home if none
      const from = location.state?.from || "/";
      navigate(from, { replace: true });

    } catch (err) {
      toast.error(err.message);
    }
  };

  // --------------------------
  // FORGOT PASSWORD HANDLER
  // --------------------------
  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success("Password reset link sent to your email 💙");
      setShowForgot(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {!showForgot ? (
          /* ===================== LOGIN FORM ===================== */
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Login to Your Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="text-right mb-4">
                <button
                  type="button"
                  className="text-sm text-blue-700 hover:underline"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-700 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </>
        ) : (
          /* ===================== FORGOT PASSWORD ===================== */
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
              Reset Password
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              onClick={handleForgotPassword}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Reset Link
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              <button
                className="text-blue-700 hover:underline"
                onClick={() => setShowForgot(false)}
              >
                Back to Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
