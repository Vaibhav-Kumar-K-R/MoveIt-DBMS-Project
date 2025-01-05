import { Route, Routes } from "react-router-dom";
import ManagerLogin from "./login/ManagerLogin";
import ProtectManagerRoute from "./auth/ProtectManagerRoute";
import Dashboard from "./dashboard/Dashboard";
import AppLayout from "@/layouts/AppLayout/AppLayout";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectManagerRoute />}>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="login" element={<ManagerLogin />} />
    </Routes>
  );
};

export default ManagerRoutes;
