import { useManagerAuth } from "@/api/ManagersApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

const ProtectManagerRoute = () => {
  const { isSignedIn, isLoading } = useManagerAuth();

  if (isLoading) {
    return <Redirect />;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/manager/login" replace />;
};

export default ProtectManagerRoute;
