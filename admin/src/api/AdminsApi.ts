import axiosInstance from "@/lib/axios";
import { LoginFormData } from "@/pages/login/types";
import {
  CreateWarehouseFormData,
  CreateManagerFormData,
} from "@/forms/types/index";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CreateWarehouseResponseType,
  UpdateWarehouseResponseType,
} from "@/pages/warehouses/types/index";
import { UpdateManagerResponseType } from "@/pages/managers/types/index";
import { AdminData } from "@/types/index";
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
    warehouseData: CreateWarehouseFormData,
  ): Promise<CreateWarehouseResponseType> => {
    try {
      const response = await axiosInstance.post(
        "/admin/create-warehouse",
        warehouseData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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
  ): Promise<UpdateWarehouseResponseType> => {
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
export const useGetWarehouseManagersListRequest = () => {
  const warehouseManagersListRequest = async () => {
    try {
      const response = await axiosInstance.get("/admin/warehousemanagerList");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "warehouseManagersListRequest",
    queryFn: warehouseManagersListRequest,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};

export const useAdminLogoutRequest = () => {
  const adminLogoutRequest = async () => {
    try {
      const response = await axiosInstance.post("/admin/auth/sign-out");
      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };
  const queryClient = useQueryClient();

  const {
    mutateAsync: logout,
    data,
    isError,
    isLoading,
  } = useMutation({
    mutationKey: "adminLogoutRequest",
    mutationFn: adminLogoutRequest,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: "adminAuth" });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: "adminAuth",
        }),
        queryClient.invalidateQueries({
          queryKey: "isLoggedInRequest",
        }),
      ]);
      toast("Logged out successfully", { icon: "🚀" });
      queryClient.clear();
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    logout,
    response: data,
    isLogoutLoading: isLoading,
    isError,
  };
};

export const useGetManagersRequest = () => {
  const getManagersRequest = async () => {
    try {
      const response = await axiosInstance.get("/admin/managers");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "getManagersRequest",
    queryFn: getManagersRequest,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};

export const useCreateManagerMutation = () => {
  const createManagerMutation = async (managerData: CreateManagerFormData) => {
    try {
      const response = await axiosInstance.post(
        "/admin/create-manager",
        managerData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: createManager,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: "createManager",
    mutationFn: createManagerMutation,
    onSuccess: () => {
      toast.success("Manager profile created successfully ");

      reset();
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    createManager,
    isLoading,
    response: data,
  };
};

export const useUpdateManagerStatusMutation = () => {
  const updateManagerStatusMutation = async (
   data:{
    email:string,
    work_status:string
   }
  ): Promise<UpdateManagerResponseType> => {
    try {
      const response = await axiosInstance.patch(
        "/admin/update-managerWork-status/",
       data,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: updateManagerStatus,
    isLoading,
    data,
    reset,
  } = useMutation({
    mutationKey: "updateManager",
    mutationFn: updateManagerStatusMutation,
    onSuccess: () => {
      toast.success("Manager status updated successfully ");
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.toString());
      reset();
    },
  });

  return {
    updateManagerStatus,
    isLoading,
    response: data,
  };
};

export const useGetVehiclesRequest = () => {
  const getManagersRequest = async () => {
    try {
      const response = await axiosInstance.get("/admin/vehicles");

      return response.data;
    } catch (error: any) {
      throw new Error("You need to be logged in to access this page");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "getVehiclesRequest",
    queryFn: getVehiclesRequest,
  });

  return {
    response: data,
    isLoading,
    isError,
  };
};
