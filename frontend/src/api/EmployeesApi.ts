import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { AddTrackingFormValues } from "@/pages/employee/add-tracking/types";
import { EmployeeType } from "@/types/employee";
import { Warehouses } from "@/types/warehouse";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const useEmployeeLogoutRequest = () => {
  const employeeLogoutRequest = async () => {
    try {
      const response = await axiosInstance.post("/employee/auth/sign-out");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: logoutEmployee,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "employeeLogoutRequest",
    mutationFn: employeeLogoutRequest,
    onSuccess: async () => {
      // Invalidate queries on logout
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: "employeeAuth",
        }),
        queryClient.invalidateQueries({
          queryKey: "isLoggedInRequest",
        }),
      ]);

      // Clear cache data on logout
      queryClient.clear();

      toast("Logged out successfully", { icon: "🚀" });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    logoutEmployee,
    isLoading,
    error,
    isSuccess,
  };
};

export const useGetAllWarehousesRequest = () => {
  const getAllWarehousesRequest = async (): Promise<Warehouses> => {
    try {
      const response = await axiosInstance.get("/employee/all-warehouses");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    data: allWarehouses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "getAllWarehousesRequest",
    queryFn: getAllWarehousesRequest,
  });

  return {
    allWarehouses,
    isLoading,
    isError,
  };
};

export const useAddTrackingRequest = () => {
  const addTrackingRequest = async (trackingInfo: AddTrackingFormValues) => {
    try {
      const response = await axiosInstance.post(
        "/employee/add-tracking",
        trackingInfo
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: addTracking,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "addTrackingRequest",
    mutationFn: addTrackingRequest,
    onSuccess: () => {
      toast("Tracking added successfully", { icon: "🚀" });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    addTracking,
    isLoading,
    error,
    isSuccess,
  };
};
