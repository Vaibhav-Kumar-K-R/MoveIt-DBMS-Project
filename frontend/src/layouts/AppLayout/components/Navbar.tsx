import { useIsLoggedInRequest } from "@/api/AuthApi";
import AppLogo from "@/components/AppLogo";
import EmployeeAuthButton from "@/pages/employee/auth/EmployeeAuthButton";
import ManagerAuthButton from "@/pages/manager/auth/ManagerAuthButton";
import VendorAuthButton from "@/pages/vendor/auth/VendorAuthButton";
import WarehouseAuthButton from "@/pages/warehouse/auth/WarehouseAuthButton";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { role } = useIsLoggedInRequest();

  return (
    <nav className="flex items-center justify-between w-full px-10 py-4 border-b sticky top-0 bg-white/40 backdrop-blur-lg z-50">
      <div>
        <AppLogo />
      </div>

      <div className="hidden md:block">
        <MainNav />
      </div>

      <div className="flex items-center gap-4">
        {role === "employee" ? (
          <EmployeeAuthButton />
        ) : role === "manager" ? (
          <ManagerAuthButton />
        ) : role === "vendor" ? (
          <VendorAuthButton />
        ) : role === "warehouse" ? (
          <WarehouseAuthButton />
        ) : (
          <></>
        )}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
