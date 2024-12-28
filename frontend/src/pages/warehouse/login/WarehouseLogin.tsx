import { useWarehouseLoginRequest } from "@/api/WarehousesApi";
import LoginForm from "@/forms/login/LoginForm";
import { Building } from "lucide-react";

const WarehouseLogin = () => {
  const { loginWarehouse, isLoading: isLoginRequestLoading } =
    useWarehouseLoginRequest();

  return (
    <LoginForm
      onSave={loginWarehouse}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <span className="flex items-center gap-2">
          <Building />
          <span>Warehouse Login</span>
        </span>
      }
      imgIllustrationSrc="/images/warehouse-illustration.png"
    />
  );
};

export default WarehouseLogin;
