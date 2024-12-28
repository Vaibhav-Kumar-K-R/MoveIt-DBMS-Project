import { useWarehouseAuth } from "@/api/WarehousesApi";
import AuthButton from "@/components/AuthButton";

const WarehouseAuthButton = () => {
  const { warehouse, isLoading } = useWarehouseAuth();

  if (isLoading) {
    return null;
  }

  return <AuthButton {...warehouse}></AuthButton>;
};

export default WarehouseAuthButton;
