import { useEmployeeAuth, useEmployeeLoginRequest } from "@/api/EmployeesApi";
import LoginForm from "@/forms/login/LoginForm";
import Redirect from "@/pages/redirect/Redirect";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EmployeeLogin = () => {
  const { loginEmployee, isLoading: isLoginRequestLoading } =
    useEmployeeLoginRequest();
  const {
    isSignedIn,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useEmployeeAuth();
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
      onSave={loginEmployee}
      isLoading={isLoginRequestLoading}
      loginHeader={
        <>
          <User2 />
          <span>Employee Login</span>
        </>
      }
      imgIllustrationSrc="/images/employee-illustration.png"
    />
  );
};

export default EmployeeLogin;
