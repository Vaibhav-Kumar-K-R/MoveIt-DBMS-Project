import {
  useWarehouseAuth,
  useWarehouseLogoutRequest,
} from "@/api/WarehousesApi";
import AuthButton from "@/components/AuthButton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const WarehouseAuthButton = () => {
  const { warehouse, isLoading } = useWarehouseAuth();
  const { logoutWarehouse, isLoading: isLogoutRequestLoading } =
    useWarehouseLogoutRequest();

  if (isLoading || !warehouse) {
    return null;
  }

  return (
    <AuthButton
      {...warehouse}
      logOut={logoutWarehouse}
      isLogoutLoading={isLogoutRequestLoading}
    >
      <Separator />
      <Link
        to={`/warehouse/dashboard`}
        className={cn(
          buttonVariants({
            className: "w-full border py-[1.2rem]",
          }),
        )}
      >
        <UserCheck />
        Go to Dashboard
      </Link>
    </AuthButton>
  );
};

export default WarehouseAuthButton;
