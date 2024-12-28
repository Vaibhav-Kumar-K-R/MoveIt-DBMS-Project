import { Route, Routes } from "react-router-dom";
import ManagerLogin from "./login/ManagerLogin";
import ProtectManagerRoute from "./auth/ProtectManagerRoute";
import { Home } from "lucide-react";

const ManagerRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectManagerRoute />}>
        <Route path="dashboard" element={<Home />} />
      </Route>

      <Route path="login" element={<ManagerLogin />} />
    </Routes>
  );
};

export default ManagerRoutes;
