import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Home from "./pages/home/Home";
import Warehouse from "./pages/warehouses/Warehouse";
import Manager from "./pages/managers/Manager";
import Vehicle from "./pages/vehicles/Vehicle";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashBoardLayout />}>
          <Route index element={<Home />} />
          <Route path="warehouses" element={<Warehouse />} />
          <Route path="managers" element={<Manager />} />
          <Route path="vehicles" element={<Vehicle />} />
          {/* Add other pages requiring AppLayout here */}
        </Route>
      </Route>

      {/* Public Route for Login */}
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
