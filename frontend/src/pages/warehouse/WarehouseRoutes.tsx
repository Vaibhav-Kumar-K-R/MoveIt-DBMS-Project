import { Route, Routes } from "react-router-dom";
import WarehouseLogin from "./login/WarehouseLogin";
import ProtectWarehouseRoute from "./auth/ProtectWarehouseRoute";
import Dashboard from "./dashboard/Dashboard";
import AppLayout from "@/layouts/AppLayout/AppLayout";

const WarehouseRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectWarehouseRoute />}>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="login" element={<WarehouseLogin />} />
    </Routes>
  );
};

export default WarehouseRoutes;
