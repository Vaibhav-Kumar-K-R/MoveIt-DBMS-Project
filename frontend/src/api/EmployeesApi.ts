import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { EmployeeType } from "@/types/employee";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useEmployeeAuth = () => {
  const employeeAuth = async (): Promise<EmployeeType> => {
    try {
      const response = await axiosInstance.get("/employee/me");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "employeeAuth",
    queryFn: employeeAuth,
  });

  return {
    isSignedIn: !!data,
    employee: data,
    isLoading,
    isError,
  };
};

export const useEmployeeLoginRequest = () => {
  const employeeLoginRequest = async (loginData: LoginFormData) => {
    try {
      const response = await axiosInstance.post(
        "/employee/auth/sign-in",
        loginData
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginEmployee,
    isLoading,
    error,
    isSuccess,
    data,
  } = useMutation({
    mutationKey: "employeeLoginRequest",
    mutationFn: employeeLoginRequest,
    onSuccess: () => {
      toast("Logged in successfully", { icon: "🚀" });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    loginEmployee,
    isLoading,
    error,
    isSuccess,
    data,
  };
};
