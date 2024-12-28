import { useEmployeeAuth } from "@/api/EmployeesApi";
import Redirect from "@/pages/redirect/Redirect";
import { Navigate, Outlet } from "react-router-dom";

const ProtectEmployeeRoute = () => {
  const { isSignedIn, isLoading } = useEmployeeAuth();

  if (isLoading) {
    return <Redirect />;
  }

  return isSignedIn ? <Outlet /> : <Navigate to="/employee/login" replace />;
};

export default ProtectEmployeeRoute;
