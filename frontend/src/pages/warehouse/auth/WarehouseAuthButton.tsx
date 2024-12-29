import {
  useWarehouseAuth,
  useWarehouseLogoutRequest,
} from "@/api/WarehousesApi";
import AuthButton from "@/components/AuthButton";

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
    ></AuthButton>
  );
};

export default WarehouseAuthButton;
