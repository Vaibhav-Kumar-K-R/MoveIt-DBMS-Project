import { MultiStepForm } from "@/components/ui/multi-step-form";
import { ShoppingCart } from "lucide-react";
import MultiStepFormContextProvider from "@/context/MultiStepFormContext";
import ProductForm from "./components/ProductForm";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import OrderSummary from "./components/OrderSummary";

const CreateOrderForm = () => {
  return (
    <MultiStepFormContextProvider
      stepsArray={[<ProductForm />, <CustomerDetailsForm />, <OrderSummary />]}
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
