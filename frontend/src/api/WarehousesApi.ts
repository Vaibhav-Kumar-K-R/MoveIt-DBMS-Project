import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { DepartTrackingFormValues } from "@/pages/warehouse/dashboard/forms/depart-tracking/types";
import { AssignedOrders, Warehouses } from "@/types/warehouse";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const useWarehouseLogoutRequest = () => {
  const warehouseLogoutRequest = async () => {
    try {
      const response = await axiosInstance.post("/warehouse/auth/sign-out");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: logoutWarehouse,
    isLoading,
    data,
    error,
  } = useMutation({
    mutationKey: "warehouseLogoutRequest",
    mutationFn: warehouseLogoutRequest,
    onSuccess: async () => {
      toast("Logged out successfully", { icon: "🚀" });

      // Invalidate queries on logout
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: "warehouseAuth",
        }),
        queryClient.invalidateQueries({
          queryKey: "isLoggedInRequest",
        }),
      ]);

      // Clear cache data on logout
      queryClient.clear();
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    logoutWarehouse,
    isLoading,
    data,
    error,
  };
};

export const useGetAllWarehousesRequest = () => {
  const getAllWarehousesRequest = async (): Promise<Warehouses> => {
    try {
      const response = await axiosInstance.get("/warehouse/all-warehouses");

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

export const useGetAssignedOrdersRequest = () => {
  const getAssignedOrdersRequest = async (): Promise<AssignedOrders> => {
    try {
      const response = await axiosInstance.get(
        "/warehouse/get-assigned-orders"
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    data: assignedOrders,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: "getAssignedOrdersRequest",
    queryFn: getAssignedOrdersRequest,
  });

  return {
    assignedOrders,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useUpdateOrderStatusRequest = (orderId: string) => {
  const updateOrderStatusRequest = async (status: string) => {
    const queryParams = new URLSearchParams();

    queryParams.append("status", status);

    try {
      const response = await axiosInstance.patch(
        `/warehouse/update-order-status/${orderId}?${queryParams.toString()}`
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: updateOrderStatus,
    isLoading,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: [orderId, "updateOrderStatusRequest"],
    mutationFn: updateOrderStatusRequest,
    onSuccess: async () => {
      toast("Order status updated successfully", { icon: "🚀" });

      // Invalidate queries on order status update
      await queryClient.invalidateQueries({
        queryKey: "getAssignedOrdersRequest",
      });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    acceptOrder: () => updateOrderStatus("accepted"),
    rejectOrder: () => updateOrderStatus("rejected"),
    isLoading,
    data,
    error,
    isSuccess,
  };
};

export const useOrderDepartureRequest = () => {
  const orderDepartureRequest = async (data: DepartTrackingFormValues) => {
    try {
      const response = await axiosInstance.post("/warehouse/departure", data);

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: departOrder,
    isLoading,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "orderDepartureRequest",
    mutationFn: orderDepartureRequest,
    onSuccess: () => {
      toast("Departure order sent successfully", { icon: "🚀" });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    departOrder,
    isLoading,
    data,
    error,
    isSuccess,
  };
};
