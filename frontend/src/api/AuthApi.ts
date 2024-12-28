import axiosInstance from "@/lib/axios";
import { AuthType } from "@/types/auth";
import { useQuery } from "react-query";

export const useIsLoggedInRequest = () => {
  const isLoggedInRequest = async (): Promise<AuthType> => {
    try {
      const response = await axiosInstance.get("/auth/me");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: "isLoggedInRequest",
    queryFn: isLoggedInRequest,
  });

  return {
    isSignedIn: data?.isAuthenticated,
    role: data?.role,
    isLoading,
    isError,
  };
};
