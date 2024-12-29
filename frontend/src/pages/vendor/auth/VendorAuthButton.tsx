import { useVendorAuth, useVendorLogoutRequest } from "@/api/VendorsApi";
import AuthButton from "@/components/AuthButton";

const VendorAuthButton = () => {
  const { vendor, isLoading } = useVendorAuth();
  const { logoutVendor, isLoading: isLogoutRequestLoading } =
    useVendorLogoutRequest();

  if (isLoading || !vendor) {
    return null;
  }

  return (
    <AuthButton
      {...vendor}
      logOut={logoutVendor}
      isLogoutLoading={isLogoutRequestLoading}
    ></AuthButton>
  );
};

export default VendorAuthButton;
