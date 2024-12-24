import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home/Home";
import NotFound from "./pages/not-found/NotFound";
import Login from "./pages/login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        {/* Other pages which needs layout */}
      </Route>
      <Route path="/login" element={<Login />} />

      {/* Pages which doesn't need layout */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
