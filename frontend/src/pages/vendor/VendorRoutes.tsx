import { Route, Routes } from "react-router-dom";
import VendorLogin from "./login/VendorLogin";
import VendorsSignUp from "./sign-up/VendorsSignUp";
import ProtectVendorRoute from "./auth/ProtectVendorRoute";
import { Home } from "lucide-react";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectVendorRoute />}>
        <Route path="dashboard" element={<Home />} />
      </Route>

      <Route path="login" element={<VendorLogin />} />
      <Route path="sign-up" element={<VendorsSignUp />} />
    </Routes>
  );
};

export default VendorRoutes;
