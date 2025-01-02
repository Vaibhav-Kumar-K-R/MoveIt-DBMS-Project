import { OrderFormType } from "@/pages/vendor/dashboard/order-form/types";
import { createContext, useContext, useState } from "react";

type VendorDashboardContextProviderProps = {
  children: React.ReactNode;
};

type VendorDashboardContextType = {
  orderData: OrderFormType;
  updateOrderData: (data: Partial<OrderFormType>) => void;
};

const VendorDashboardContext = createContext<
  VendorDashboardContextType | undefined
>(undefined);

const VendorDashboardContextProvider = ({
  children,
}: VendorDashboardContextProviderProps) => {
  const [orderData, setOrderData] = useState<OrderFormType>({
    product_name: "",
    product_description: "",
    quantity: 1,
    product_img_url: "",
    price_details: {
      product_price: 0,
      delivery_charge: 0,
      gst: 0,
    },
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    weight: 0,
    order_placed_date: new Date(),
  });

  const updateOrderData = (data: Partial<OrderFormType>) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      ...data,
    }));
  };

  return (
    <VendorDashboardContext.Provider
      value={{
        orderData,
        updateOrderData,
      }}
    >
      {children}
    </VendorDashboardContext.Provider>
  );
};

export default VendorDashboardContextProvider;

export const useVendorDashboardContext = () => {
  const context = useContext(VendorDashboardContext);

  if (context === undefined) {
    throw new Error(
      "useVendorDashboardContext must be used within a VendorDashboardContextProvider"
    );
  }

  return context;
};
