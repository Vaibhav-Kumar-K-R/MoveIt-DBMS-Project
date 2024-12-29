import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { VendorsSignUpData } from "@/pages/vendor/sign-up/types";
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
        loginData
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
        signUpFormData
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
    onSuccess: () => {
      toast("Logged out successfully", { icon: "🚀" });

      // Reset queries on logout
      queryClient.resetQueries({
        queryKey: ["vendorAuth", "isLoggedInRequest"],
      });

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
