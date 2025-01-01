import { Route, Routes } from "react-router-dom";
import VendorLogin from "./login/VendorLogin";
import VendorsSignUp from "./sign-up/VendorsSignUp";
import ProtectVendorRoute from "./auth/ProtectVendorRoute";
import Dashboard from "./dashboard/Dashboard";
import AppLayout from "@/layouts/AppLayout/AppLayout";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectVendorRoute />}>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      <Route path="login" element={<VendorLogin />} />
      <Route path="sign-up" element={<VendorsSignUp />} />
    </Routes>
  );
};

export default VendorRoutes;
