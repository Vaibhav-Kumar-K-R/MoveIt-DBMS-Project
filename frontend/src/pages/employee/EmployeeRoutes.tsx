import { Route, Routes } from "react-router-dom";
import ProtectEmployeeRoute from "./auth/ProtectEmployeeRoute";
import EmployeeLogin from "./login/EmployeeLogin";
import Profile from "./profile/Profile";
import AppLayout from "@/layouts/AppLayout/AppLayout";

const EmployeeRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route element={<ProtectEmployeeRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="login" element={<EmployeeLogin />} />
    </Routes>
  );
};

export default EmployeeRoutes;
