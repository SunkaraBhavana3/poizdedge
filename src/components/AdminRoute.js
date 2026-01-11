import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const toastShown = useRef(false); // ✅ ensures toast only shows once

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user?.email) {
        setChecking(false);
        return;
      }
      try {
        const res = await axios.get(`https://poizdedgebackend.onrender.com/api/auth/me/${user.email}`);
        setIsAdmin(res.data.user.isAdmin);
      } catch (err) {
        console.error(err);
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };
    checkAdmin();
  }, [user]);

  // ✅ Show toast only once if not admin
  useEffect(() => {
    if (!loading && !checking && user && !isAdmin && !toastShown.current) {
      toast.error("🚫 You are not allowed to access this page");
      toastShown.current = true;
    }
  }, [loading, checking, user, isAdmin]);

  if (loading || checking) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <div className="p-10 text-center text-red-600 font-bold">🚫 Not allowed</div>;
  }

  return children;
};

export default AdminRoute;
