import MiniInformationCard from "@/components/MiniInformationCard";
import { Separator } from "@/components/ui/separator";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { formatDate, formatTime } from "@/helpers/format-date";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { Order } from "@/types/order";
import {
  Calendar,
  CreditCard,
  IndianRupee,
  Mail,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
} from "lucide-react";

type OrderDetailsProps = {
  order: Order;
};

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Order Details</h1>

      <div className="flex justify-center my-7">
        <img src={order.product_img_url} alt="Product Image" className="h-28" />
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
              information: order.product_name,
            },
            {
              icon: Package,
              title: "Description",
              information: order.product_description,
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
              information: `${order.quantity}`,
            },
            {
              icon: Truck,
              title: "Weight",
              information: `${order.weight} kg`,
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
              icon: IndianRupee,
              title: "Product Price",
              information: formatIndianCurrency(
                order.price_details.product_price,
              ),
            },
            {
              icon: Truck,
              title: "Delivery Charge",
              information: formatIndianCurrency(
                order.price_details.delivery_charge,
              ),
            },
            {
              icon: CreditCard,
              title: "GST",
              information: `${(order.price_details.gst * 100).toFixed(1)}%`,
            },
            {
              icon: IndianRupee,
              title: "Net Price",
              information: formatIndianCurrency(
                order.price_details.total_price,
              ),
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
              information: order.customer_email,
            },
            {
              icon: Phone,
              title: "Phone",
              information: formatPhoneNumber(order.customer_phone),
            },
            {
              icon: MapPin,
              title: "Address",
              information: order.customer_address,
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
            order.order_placed_date,
          )} | At ${formatTime(order.order_placed_date)}`}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
