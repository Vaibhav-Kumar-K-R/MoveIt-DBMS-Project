import { useWarehouseAuth } from "@/api/WarehousesApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

const ProtectWarehouseRoute = () => {
  const { isSignedIn, isLoading } = useWarehouseAuth();

  if (isLoading) {
    return <Redirect />;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/warehouse/login" replace />;
};

export default ProtectWarehouseRoute;
