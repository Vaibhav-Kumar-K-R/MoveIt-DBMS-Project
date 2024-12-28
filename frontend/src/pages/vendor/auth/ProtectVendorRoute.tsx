import { useVendorAuth } from "@/api/VendorsApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

const ProtectVendorRoute = () => {
  const { isSignedIn, isLoading } = useVendorAuth();

  if (isLoading) {
    return <Redirect />;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/vendor/login" replace />;
};

export default ProtectVendorRoute;
