import MiniInformationCard from "@/components/MiniInformationCard";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  DollarSign,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { OrderFormType } from "../types";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { formatDate, formatTime } from "@/helpers/format-date";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { useCreateOrderRequest } from "@/api/VendorsApi";

type OrderSummaryProps = {
  orderData: OrderFormType;
};

const OrderSummary = ({ orderData }: OrderSummaryProps) => {
  const { createOrder, isLoading } = useCreateOrderRequest();
  const { controls } = useMultiStepFormContext();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createOrder(orderData);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col w-full">
      <h1 className="text-xl font-bold mb-2">Verify Order Details</h1>

      <div className="flex justify-center my-7">
        <img
          src={orderData.product_img_url}
          alt="Product Image"
          className="h-28"
        />
      </div>

      <Separator className="my-4" />

      {/* Product Details */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Product Details</h3>

        <div className="grid grid-cols-1 gap-y-4">
          {[
            {
              icon: ShoppingBag,
              title: "Product Name",
              information: orderData.product_name,
            },
            {
              icon: Package,
              title: "Description",
              information: orderData.product_description,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          {[
            {
              icon: Package,
              title: "Quantity",
              information: `${orderData.quantity}`,
            },
            {
              icon: Truck,
              title: "Weight",
              information: `${orderData.weight} kg`,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Price Details */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Price Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          {[
            {
              icon: DollarSign,
              title: "Product Price",
              information: `$${orderData.price_details.product_price.toFixed(
                2
              )}`,
            },
            {
              icon: Truck,
              title: "Delivery Charge",
              information: `$${orderData.price_details.delivery_charge.toFixed(
                2
              )}`,
            },
            {
              icon: CreditCard,
              title: "GST",
              information: `${(orderData.price_details.gst * 100).toFixed(1)}%`,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Customer Details */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Customer Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          {[
            {
              icon: Mail,
              title: "Email",
              information: orderData.customer_email,
            },
            {
              icon: Phone,
              title: "Phone",
              information: formatPhoneNumber(orderData.customer_phone),
            },
            {
              icon: MapPin,
              title: "Address",
              information: orderData.customer_address,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Order Date */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Order Details</h3>
        <MiniInformationCard
          icon={Calendar}
          title={"Order Placed Date"}
          information={`${formatDate(
            orderData.order_placed_date
          )} | At ${formatTime(orderData.order_placed_date)}`}
        />
      </div>

      <MultiStepFormButtons {...controls} isLoading={isLoading} />
    </form>
  );
};

export default OrderSummary;
