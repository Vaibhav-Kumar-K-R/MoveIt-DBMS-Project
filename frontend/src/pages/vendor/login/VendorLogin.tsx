import { useVendorLoginRequest } from "@/api/VendorsApi";
import LoginForm from "@/forms/login/LoginForm";
import { Store } from "lucide-react";

const VendorLogin = () => {
  const { loginVendor, isLoading: isLoginRequestLoading } =
    useVendorLoginRequest();

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
