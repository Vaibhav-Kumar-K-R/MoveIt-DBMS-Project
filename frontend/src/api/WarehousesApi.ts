import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useWarehouseAuth = () => {
  const warehouseAuth = async () => {
    try {
      const response = await axiosInstance.get("/warehouse/me");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "warehouseAuth",
    queryFn: warehouseAuth,
  });

  return {
    isSignedIn: !!data,
    warehouse: data,
    isLoading,
    isError,
  };
};

export const useWarehouseLoginRequest = () => {
  const warehouseLoginRequest = async (loginData: LoginFormData) => {
    try {
      const response = await axiosInstance.post(
        "/warehouse/auth/sign-in",
        loginData
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginWarehouse,
    isLoading,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "warehouseLoginRequest",
    mutationFn: warehouseLoginRequest,
    onSuccess: () => {
      toast("Logged in successfully", { icon: "🚀" });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    loginWarehouse,
    isLoading,
    error,
    isSuccess,
    data,
  };
};
