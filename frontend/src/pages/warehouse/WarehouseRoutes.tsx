import { Route, Routes } from "react-router-dom";
import WarehouseLogin from "./login/WarehouseLogin";
import ProtectWarehouseRoute from "./auth/ProtectWarehouseRoute";
import { Home } from "lucide-react";

const WarehouseRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectWarehouseRoute />}>
        <Route path="dashboard" element={<Home />} />
      </Route>

      <Route path="login" element={<WarehouseLogin />} />
    </Routes>
  );
};

export default WarehouseRoutes;
