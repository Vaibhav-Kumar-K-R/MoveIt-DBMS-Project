import { useVendorAuth, useVendorLoginRequest } from "@/api/VendorsApi";
import LoginForm from "@/forms/login/LoginForm";
import Redirect from "@/pages/redirect/Redirect";
import { Store } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VendorLogin = () => {
  const { loginVendor, isLoading: isLoginRequestLoading } =
    useVendorLoginRequest();
  const {
    isSignedIn,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useVendorAuth();
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
      onSave={loginVendor}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <span className="flex items-center gap-2">
          <Store />
          <span>Vendor Login</span>
        </span>
      }
      imgIllustrationSrc="/images/vendor-illustration.png"
    />
  );
};

export default VendorLogin;
