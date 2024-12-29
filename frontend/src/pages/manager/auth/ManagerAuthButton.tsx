import { useManagerAuth, useManagerLogoutRequest } from "@/api/ManagersApi";
import AuthButton from "@/components/AuthButton";

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
    ></AuthButton>
  );
};

export default ManagerAuthButton;
