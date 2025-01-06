import { LoginFormData } from "@/forms/login/types";
import axiosInstance from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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

export const useManagerLogoutRequest = () => {
  const managerLogoutRequest = async () => {
    try {
      const response = await axiosInstance.post("/manager/auth/sign-out");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: logoutManager,
    isLoading,
    data,
    error,
  } = useMutation({
    mutationKey: "managerLogoutRequest",
    mutationFn: managerLogoutRequest,
    onSuccess: async () => {
      toast("Logged out successfully", { icon: "🚀" });

      // Invalidate queries on logout
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: "managerAuth",
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
    logoutManager,
    isLoading,
    data,
    error,
  };
};

export const useAddEmployeeRequest = () => {
  const addEmployeeRequest = async (data: any) => {
    try {
      const response = await axiosInstance.post("/manager/add-employee", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: addEmployee,
    isLoading,
    data,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: "addEmployeeRequest",
    mutationFn: addEmployeeRequest,
    onSuccess: () => {
      toast("Employee added successfully", { icon: "🚀" });
    },
    onError: (error: any) => {
      toast(error.message, { icon: "🚨" });
    },
  });

  return {
    addEmployee,
    isLoading,
    data,
    error,
    isSuccess,
  };
};

export const useGetEmployeesRequest = (page: number) => {
  const getEmployeesRequest = async () => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", page.toString());

    try {
      const response = await axiosInstance.get(
        `/manager/get-employees?${queryParams.toString()}`
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [page, "getEmployeesRequest"],
    queryFn: getEmployeesRequest,
  });

  return {
    employees: data,
    isLoading,
    isError,
  };
};
