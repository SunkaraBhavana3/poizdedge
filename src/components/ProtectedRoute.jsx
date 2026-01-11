import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const shown = useRef(false);

  useEffect(() => {
    if (!loading && !user && !shown.current) {
      toast.info("Please sign in to continue 🔐");
      shown.current = true;
    }
  }, [user, loading]);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
