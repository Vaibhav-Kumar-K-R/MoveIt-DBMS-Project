import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { OrderFormType } from "@/pages/vendor/dashboard/order-form/types";
import { VendorsSignUpData } from "@/pages/vendor/sign-up/types";
import { RecentOrdersType } from "@/types/vendor";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useVendorAuth = () => {
  const vendorAuth = async () => {
    try {
      const response = await axiosInstance.get("/vendor/me");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "vendorAuth",
    queryFn: vendorAuth,
  });

  return {
    isSignedIn: !!data,
    vendor: data,
    isLoading,
    isError,
  };
};

export const useVendorLoginRequest = () => {
  const vendorLoginRequest = async (loginData: LoginFormData) => {
    try {
      const response = await axiosInstance.post(
        "/vendor/auth/sign-in",
        loginData,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: loginVendor,
    data,
    isLoading,
    error,
  } = useMutation({
    mutationKey: "vendorLoginRequest",
    mutationFn: vendorLoginRequest,
    onSuccess: () => {
      toast("Logged in successfully", { icon: "🚀" });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    loginVendor,
    vendor: data,
    isLoading,
    isError: !!error,
  };
};

export const useVendorSignUpRequest = () => {
  const vendorSignUpRequest = async (signUpFormData: VendorsSignUpData) => {
    try {
      const response = await axiosInstance.post(
        "/vendor/auth/sign-up",
        signUpFormData,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const navigate = useNavigate();
  const {
    mutateAsync: signUpVendor,
    data,
    isLoading,
    error,
  } = useMutation({
    mutationKey: "vendorSignUpRequest",
    mutationFn: vendorSignUpRequest,
    onSuccess: () => {
      toast("Signed up successfully", { icon: "🚀" });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      console.log(error);
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    signUpVendor,
    vendor: data,
    isLoading,
    isError: !!error,
  };
};

export const useVendorLogoutRequest = () => {
  const vendorLogoutRequest = async () => {
    try {
      const response = await axiosInstance.post("/vendor/auth/sign-out");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: logoutVendor,
    isLoading,
    data,
    error,
  } = useMutation({
    mutationKey: "vendorLogoutRequest",
    mutationFn: vendorLogoutRequest,
    onSuccess: async () => {
      toast("Logged out successfully", { icon: "🚀" });

      // Invalidate queries on logout
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: "vendorAuth",
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
    logoutVendor,
    isLoading,
    data,
    error,
  };
};

export const useCreateOrderRequest = () => {
  const createOrderRequest = async (orderData: OrderFormType) => {
    try {
      const response = await axiosInstance.post(
        "/vendor/create-order",
        orderData,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: createOrder,
    data,
    isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "createOrderRequest",
    mutationFn: createOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "getRecentOrderRequest",
      });
    },
  });

  if (isSuccess) {
    toast.success("Order created successfully", { icon: "🚀" });
  }

  if (error) {
    toast.error(error.toString(), { icon: "🚨" });
  }

  return {
    createOrder,
    isLoading,
    data,
    error,
    isSuccess,
  };
};

export const useEditOrderRequest = (orderId: string) => {
  const editOrderRequest = async (orderData: OrderFormType) => {
    try {
      const response = await axiosInstance.post(
        `/vendor/edit-order/${orderId}`,
        orderData,
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: editOrder,
    data,
    isLoading,
    error,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: [orderId, "editOrderRequest"],
    mutationFn: editOrderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "getRecentOrderRequest",
      });
    },
  });

  if (isSuccess) {
    toast.success("Order updated successfully", { icon: "🚀" });
    reset();
  }

  if (error) {
    toast.error(error.toString(), { icon: "🚨" });
    reset();
  }

  return {
    editOrder,
    isLoading,
    data,
    error,
    isSuccess,
  };
};

export const useGetRecentOrdersRequest = () => {
  const getRecentOrderRequest = async (): Promise<RecentOrdersType> => {
    try {
      const response = await axiosInstance.get("/vendor/recent-orders");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    data: recentOrders,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: "getRecentOrderRequest",
    queryFn: getRecentOrderRequest,
  });

  return {
    recentOrders,
    isLoading,
    isSuccess,
    error,
  };
};
