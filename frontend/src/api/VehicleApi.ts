import axiosInstance from "@/lib/axios";
import { Vehicles } from "@/types/vehicle";
import { useQuery } from "react-query";

export const useGetAllVehicles = () => {
  const getAllVehicles = async (): Promise<Vehicles> => {
    try {
      const response = await axiosInstance.get("/vehicle/all-vehicles");

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const {
    data: allVehicles,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: "getAllVehicles",
    queryFn: getAllVehicles,
  });

  return {
    allVehicles,
    isLoading,
    isError,
    isSuccess,
  };
};
