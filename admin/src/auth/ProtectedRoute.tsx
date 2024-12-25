import { useAdminAuth } from "@/api/AdminsApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoading } = useAdminAuth();
  const location = useLocation();

  // Show loading screen during authentication check
  if (isLoading) {
    return <Redirect />;
  }

  // Redirect signed-in users from `/login` to home
  if (isSignedIn && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }

  // Allow access for signed-in users or redirect to login
  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
