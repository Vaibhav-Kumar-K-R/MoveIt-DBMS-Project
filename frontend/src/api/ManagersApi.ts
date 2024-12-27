import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useManagerAuth = () => {
  const managerAuth = async () => {
    try {
      const response = await axiosInstance.get("/manager/me");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "managerAuth",
    queryFn: managerAuth,
  });

  return {
    isSignedIn: !!data,
    manager: data,
    isLoading,
    isError,
  };
};

export const useManagerLoginRequest = () => {
  const managerLoginRequest = async (loginData: LoginFormData) => {
    try {
      const response = await axiosInstance.post(
        "/manager/auth/sign-in",
        loginData
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginManager,
    isLoading,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "managerLoginRequest",
    mutationFn: managerLoginRequest,
    onSuccess: () => {
      toast("Logged in successfully", { icon: "🚀" });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    loginManager,
    isLoading,
    data,
    error,
    isSuccess,
  };
};
