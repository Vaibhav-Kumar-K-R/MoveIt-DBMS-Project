import { useEmployeeLoginRequest } from "@/api/EmployeesApi";
import LoginForm from "@/forms/login/LoginForm";
import { User2 } from "lucide-react";
const EmployeeLogin = () => {
  const { loginEmployee, isLoading: isLoginRequestLoading } =
    useEmployeeLoginRequest();

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
