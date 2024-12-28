import { useManagerAuth } from "@/api/ManagersApi";
import AuthButton from "@/components/AuthButton";

const ManagerAuthButton = () => {
  const { manager, isLoading } = useManagerAuth();

  if (isLoading) {
    return null;
  }

  return <AuthButton {...manager}></AuthButton>;
};

export default ManagerAuthButton;
