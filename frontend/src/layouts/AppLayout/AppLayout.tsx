import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Navbar />
      <div className="flex-1 px-5 md:px-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
