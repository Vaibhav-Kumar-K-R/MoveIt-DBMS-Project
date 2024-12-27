import { useManagerAuth, useManagerLoginRequest } from "@/api/ManagersApi";
import LoginForm from "@/forms/login/LoginForm";
import Redirect from "@/pages/redirect/Redirect";
import { UserCheck } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManagerLogin = () => {
  const { loginManager, isLoading: isLoginRequestLoading } =
    useManagerLoginRequest();
  const {
    isSignedIn,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useManagerAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/", { replace: true });
    }

    if (isAuthError) {
      toast("You need to be logged in to access this page", { icon: "⚠️" });
    }
  }, [isSignedIn, isAuthError, navigate]);

  if (isAuthLoading) {
    return <Redirect />;
  }

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
}

export default ManagerLogin;