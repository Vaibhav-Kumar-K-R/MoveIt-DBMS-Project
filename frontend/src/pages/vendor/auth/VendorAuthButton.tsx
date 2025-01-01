import { useVendorAuth, useVendorLogoutRequest } from "@/api/VendorsApi";
import AuthButton from "@/components/AuthButton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

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
    >
      <Separator />
      <Link
        to={`/vendor/dashboard`}
        className={cn(
          buttonVariants({
            className: "w-full border py-[1.2rem]",
          })
        )}
      >
        <UserCheck />
        Go to Dashboard
      </Link>
    </AuthButton>
  );
};

export default VendorAuthButton;
