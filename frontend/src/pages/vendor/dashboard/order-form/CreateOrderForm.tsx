import { MultiStepForm } from "@/components/ui/multi-step-form";
import { ShoppingCart } from "lucide-react";
import MultiStepFormContextProvider from "@/context/MultiStepFormContext";
import { useState } from "react";
import { OrderFormType } from "./types";
import ProductForm from "./components/ProductForm";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import OrderSummary from "./components/OrderSummary";

const CreateOrderForm = () => {
  // const [orderData, setOrderData] = useState<OrderFormType>({
  //   product_name: "",
  //   product_description: "",
  //   quantity: 1,
  //   product_img_url: "",
  //   price_details: {
  //     product_price: 0,
  //     delivery_charge: 0,
  //     gst: 0,
  //   },
  //   customer_name: "",
  //   customer_email: "",
  //   customer_phone: "",
  //   customer_address: "",
  //   weight: 0,
  //   order_placed_date: new Date(),
  // });
  const [orderData, setOrderData] = useState<OrderFormType>({
    product_name: "Wireless Bluetooth Headphones",
    product_description:
      "High-quality noise-cancelling headphones with 30-hour battery life.",
    quantity: 2,
    product_img_url: "https://example.com/images/headphones.jpg",
    price_details: {
      product_price: 1500.05,
      delivery_charge: 10.0,
      gst: 0.18, // GST as a decimal (18%)
    },
    customer_name: "John Doe",
    customer_email: "johndoe@example.com",
    customer_phone: "+1234567890",
    customer_address: "123 Main Street, Apt 4B, New York, NY, 10001",
    weight: 0.75, // Weight in kilograms
    order_placed_date: new Date("2024-12-20T10:30:00"), // Specific date and time
  });

  const updateOrderData = (data: Partial<OrderFormType>) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      ...data,
    }));
  };

  return (
    <MultiStepFormContextProvider
      stepsArray={[
        <ProductForm orderData={orderData} updateOrderData={updateOrderData} />,
        <CustomerDetailsForm
          orderData={orderData}
          updateOrderData={updateOrderData}
        />,
        <OrderSummary orderData={orderData} />
      ]}
    >
      <MultiStepForm
        formHeader={
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-[1.7rem] font-bold flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                <h1 className="text-2xl font-bold">Create Order</h1>
              </div>
            </h1>
            <p className="text-muted-foreground text-gray-400 text-[0.9rem]">
              Enter the order details below
            </p>
          </div>
        }
      />
    </MultiStepFormContextProvider>
  );
};

export default CreateOrderForm;
