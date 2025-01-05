import { useManagerAuth, useManagerLogoutRequest } from "@/api/ManagersApi";
import AuthButton from "@/components/AuthButton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ManagerAuthButton = () => {
  const { manager, isLoading } = useManagerAuth();
  const { logoutManager, isLoading: isLogoutRequestLoading } =
    useManagerLogoutRequest();

  if (isLoading || !manager) {
    return null;
  }

  return (
    <AuthButton
      {...manager}
      logOut={logoutManager}
      isLogoutLoading={isLogoutRequestLoading}
    >
      <Separator />
      <Link
        to={`/manager/dashboard`}
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

export default ManagerAuthButton;
