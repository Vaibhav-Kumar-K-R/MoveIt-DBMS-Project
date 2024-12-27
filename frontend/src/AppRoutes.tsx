import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import EmployeeLogin from "./pages/employee/login/EmployeeLogin";
import ManagerLogin from "./pages/manager/login/ManagerLogin";
import WarehouseLogin from "./pages/warehouse/login/WarehouseLogin";
import VendorLogin from "./pages/vendor/login/VendorLogin";
import VendorsSignUp from "./pages/vendor/sign-up/VendorsSignUp";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* Other pages which needs layout */}
      </Route>

      {/* Pages which doesn't need App Layout */}
      <Route path="/employee">
        <Route path="login" element={<EmployeeLogin />} />
      </Route>

      <Route path="/manager">
        <Route path="login" element={<ManagerLogin />} />
      </Route>

      <Route path="/warehouse">
        <Route path="login" element={<WarehouseLogin />} />
      </Route>

      <Route path="/vendor">
        <Route path="login" element={<VendorLogin />} />
        <Route path="sign-up" element={<VendorsSignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
