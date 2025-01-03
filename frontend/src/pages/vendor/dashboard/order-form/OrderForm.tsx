import { MultiStepForm } from "@/components/ui/multi-step-form";
import { ShoppingCart } from "lucide-react";
import MultiStepFormContextProvider from "@/context/MultiStepFormContext";
import ProductForm from "./components/ProductForm";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import OrderSummary from "./components/OrderSummary";
import { OrderFormType } from "./types";

type OrderFormProps = {
  orderData: OrderFormType;
  updateOrderData: (data: Partial<OrderFormType>) => void;
  formTitle?: string;
  formDescription?: string;
  isEditing?: boolean;
  order_id?: string;
};

const OrderForm = ({
  orderData,
  updateOrderData,
  formTitle = "Create Order",
  formDescription = "Enter the order details below",
  isEditing = false,
  order_id,
}: OrderFormProps) => {
  return (
    <MultiStepFormContextProvider
      stepsArray={[
        <ProductForm orderData={orderData} updateOrderData={updateOrderData} />,
        <CustomerDetailsForm
          orderData={orderData}
          updateOrderData={updateOrderData}
        />,
        <OrderSummary
          orderData={orderData}
          isEditing={isEditing}
          order_id={order_id}
        />,
      ]}
    >
      <MultiStepForm
        formHeader={
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-[1.7rem] font-bold flex items-center gap-2">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                <h1 className="text-2xl font-bold">{formTitle}</h1>
              </div>
            </h1>
            <p className="text-muted-foreground text-gray-400 text-[0.9rem]">
              {formDescription}
            </p>
          </div>
        }
      />
    </MultiStepFormContextProvider>
  );
};

export default OrderForm;
