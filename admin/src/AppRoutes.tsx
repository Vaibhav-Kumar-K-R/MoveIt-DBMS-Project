import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Home from "./pages/home/Home";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<Home />} />
          {/* Add other pages requiring AppLayout here */}
        </Route>
      </Route>

      {/* Public Route for Login */}
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
