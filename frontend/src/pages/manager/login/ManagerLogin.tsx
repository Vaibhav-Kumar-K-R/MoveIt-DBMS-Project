import { useManagerLoginRequest } from "@/api/ManagersApi";
import LoginForm from "@/forms/login/LoginForm";
import { UserCheck } from "lucide-react";

const ManagerLogin = () => {
  const { loginManager, isLoading: isLoginRequestLoading } =
    useManagerLoginRequest();

  return (
    <LoginForm
      onSave={loginManager}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <UserCheck />
          <span>Manager Login</span>
        </>
      }
      imgIllustrationSrc="/images/manager-illustration.png"
    />
  );
};

export default ManagerLogin;
