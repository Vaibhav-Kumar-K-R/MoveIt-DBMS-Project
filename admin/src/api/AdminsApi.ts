import axiosInstance from "@/lib/axios";
import { LoginFormData } from "@/pages/login/types";
import { createWarehouseFormData } from "@/pages/warehouses/types";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  AdminData,
  createWarehouseResponseType,
  updateWarehouseResponseType,
} from "@/types";
export const useAdminAuth = () => {
  const adminAuth = async (): Promise<AdminData> => {
    try {
      const response = await axiosInstance.get("/admin/me");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "adminAuth",
    queryFn: adminAuth,
  });

  return {
    isSignedIn: !!data,
    user: data,
    isLoading,
    isError,
  };
};

export const useLoginUserRequestMutation = () => {
  const loginUserRequestMutation = async (loginData: LoginFormData) => {
    try {
      const response = await axiosInstance.post("/admin/sign-in", loginData);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginAdmin,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: "loginUserRequest",
    mutationFn: loginUserRequestMutation,
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
      toast.success("Login successful! Welcome back 👋");
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    loginAdmin,
    isLoading,
    data,
  };
};

export const useGetStatsRequest = () => {
  const getStatsRequest = async () => {
    try {
      const response = await axiosInstance.get("/admin/get-stats");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "getStatsRequest",
    queryFn: getStatsRequest,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};

export const useGetWarehousesRequest = () => {
  const getWarehousesRequest = async () => {
    try {
      const response = await axiosInstance.get("/admin/warehouses");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "getWarehousesRequest",
    queryFn: getWarehousesRequest,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};

export const useCreateWarehouseMutation = () => {
  const createWarehouseMutation = async (
    warehouseData: createWarehouseFormData,
  ): Promise<createWarehouseResponseType> => {
    try {
      const response = await axiosInstance.post(
        "/admin/create-warehouse",
        warehouseData,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: createWarehouse,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: "createWarehouse",
    mutationFn: createWarehouseMutation,
    onSuccess: () => {
      toast.success("Warehouse created successfully ");

      reset();
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    createWarehouse,
    isLoading,
    response: data,
  };
};

export const useFilterWarehousesRequest = (state: string) => {
  const filterWarehousesRequest = async () => {
    try {
      const response = await axiosInstance.get(
        `/admin/warehouse/${state.trim()}`,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      throw new Error(errorMessage);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["filterWarehousesRequest", state],
    queryFn: filterWarehousesRequest,
    enabled: !!state,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};

export const useUpdateWarehouseMutation = () => {
  const updateWarehouseMutation = async (
    email: string,
  ): Promise<updateWarehouseResponseType> => {
    try {
      const response = await axiosInstance.patch(
        "/admin/update-warehouse-status/",
        { email },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: updateWarehouse,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: " updateWarehouse",
    mutationFn: updateWarehouseMutation,
    onSuccess: () => {
      toast.success("Warehouse status updated successfully ");
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    updateWarehouse,
    isLoading,
    response: data,
  };
};
