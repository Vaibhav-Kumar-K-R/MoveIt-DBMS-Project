import { useVendorAuth } from "@/api/VendorsApi";
import AuthButton from "@/components/AuthButton";

const VendorAuthButton = () => {
  const { vendor, isLoading } = useVendorAuth();

  if (isLoading) {
    return null;
  }

  return <AuthButton {...vendor}></AuthButton>;
};

export default VendorAuthButton;
