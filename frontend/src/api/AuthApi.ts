import axiosInstance from "@/lib/axios";
import { useQuery } from "react-query";

export const useIsLoggedInRequest = () => {
  const isLoggedInRequest = async () => {
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

  console.log(data);

  return {
    isSignedIn: data?.isAuthenticated,
    role: data?.role,
    isLoading,
    isError,
  };
};
