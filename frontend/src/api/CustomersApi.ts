import axiosInstance from "@/lib/axios";
import { CustomerOrderDetail } from "@/types/customer";
import { useQuery } from "react-query";

/**
 * Custom hook to fetch customer order details using a tracking ID.
 *
 * @param {string} trackingId - The tracking ID of the order.
 * @returns {object} Contains order details, loading state, error state, and error details.
 */
export const useGetCustomerOrderDetailsRequest = (trackingId: string) => {
  /**
   * Function to fetch customer order details from the API.
   *
   * @returns {Promise<CustomerOrderDetail>} The data of the customer order.
   * @throws Will throw an error if the request fails.
   */
  const getCustomerOrderDetailsRequest =
    async (): Promise<CustomerOrderDetail> => {
      try {
        const response = await axiosInstance.get(
          `/customer/get-order/${trackingId}`,
        );

        // Return the data from the response
        return response.data;
      } catch (error: any) {
        // Throw an error with the message from the caught error
        throw new Error(error.message);
      }
    };

  // Use the useQuery hook to manage the API request and its state
  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["customerOrderDetails", trackingId],
    getCustomerOrderDetailsRequest,
    {
      enabled: !!trackingId, // Enable the query only if trackingId is truthy
    },
  );

  // Return the state and data from the query
  return { orderDetails, isLoading, isError, error };
};
