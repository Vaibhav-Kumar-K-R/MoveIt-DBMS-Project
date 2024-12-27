import {
  useWarehouseAuth,
  useWarehouseLoginRequest,
} from "@/api/WarehousesApi";
import LoginForm from "@/forms/login/LoginForm";
import Redirect from "@/pages/redirect/Redirect";
import { Building } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const WarehouseLogin = () => {
  const { loginWarehouse, isLoading: isLoginRequestLoading } =
    useWarehouseLoginRequest();
  const {
    isSignedIn,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useWarehouseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }

    if (isAuthError) {
      toast("You need to be logged in to access this page", { icon: "⚠️" });
    }
  }, [isSignedIn, isAuthError, navigate]);

  if (isAuthLoading) {
    return <Redirect />;
  }

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
