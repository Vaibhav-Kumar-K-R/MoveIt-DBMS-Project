import { Route, Routes } from "react-router-dom";
import ProtectEmployeeRoute from "./auth/ProtectEmployeeRoute";
import { Home } from "lucide-react";
import EmployeeLogin from "./login/EmployeeLogin";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectEmployeeRoute />}>
        <Route path="dashboard" element={<Home />} />
      </Route>

      <Route path="login" element={<EmployeeLogin />} />
    </Routes>
  );
};

export default EmployeeRoutes;
