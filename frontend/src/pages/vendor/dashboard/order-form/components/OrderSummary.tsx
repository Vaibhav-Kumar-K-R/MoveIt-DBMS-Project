import MiniInformationCard from "@/components/MiniInformationCard";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  CreditCard,
  IndianRupee,
  LocateFixed,
  Mail,
  MapPin,
  Package,
  Phone,
  Pin,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { formatDate, formatTime } from "@/helpers/format-date";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { useCreateOrderRequest, useEditOrderRequest } from "@/api/VendorsApi";
import { OrderFormType } from "../types";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { Warehouses } from "@/types/warehouse";
import { useMemo } from "react";

type OrderSummaryProps = {
  orderData: OrderFormType;
  isEditing?: boolean;
  order_id?: string;
  nearbyWarehouses: Warehouses | undefined;
};

const OrderSummary = ({
  orderData,
  isEditing,
  order_id,
  nearbyWarehouses,
}: OrderSummaryProps) => {
  const { createOrder, isLoading: isCreateOrderLoading } =
    useCreateOrderRequest();
  const { editOrder, isLoading: isEditOrderLoading } = useEditOrderRequest(
    order_id as string
  );
  const { controls } = useMultiStepFormContext();
  const selectedWarehouse = useMemo(() => {
    return nearbyWarehouses?.warehouses.find(
      (warehouse) => warehouse._id === orderData.warehouse
    );
  }, [nearbyWarehouses, orderData]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEditing) {
      editOrder(orderData);
    } else {
      createOrder(orderData);
    }
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
              icon: IndianRupee,
              title: "Product Price",
              information: formatIndianCurrency(
                orderData.price_details.product_price
              ),
            },
            {
              icon: Truck,
              title: "Delivery Charge",
              information: formatIndianCurrency(
                orderData.price_details.delivery_charge
              ),
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
              title: "City",
              information: orderData.customer_city,
            },
            {
              icon: MapPin,
              title: "State",
              information: orderData.customer_state,
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
        <MiniInformationCard
          icon={MapPin}
          title={"Full Address"}
          information={orderData.customer_address}
        />
      </div>

      <Separator className="my-4" />

      {/* Nearby Warehouse Details */}
      {selectedWarehouse && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Selected Warehouse</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
            {[
              {
                icon: Building2,
                title: "Name",
                information: selectedWarehouse.name,
              },
              {
                icon: Phone,
                title: "Phone",
                information: formatPhoneNumber(selectedWarehouse.phone),
              },
              {
                icon: Pin,
                title: "Pin Code",
                information: selectedWarehouse.pincode,
              },
              {
                icon: Mail,
                title: "Email",
                information: selectedWarehouse.email,
              },
              {
                icon: MapPin,
                title: "City",
                information: selectedWarehouse.city,
              },
              {
                icon: MapPin,
                title: "State",
                information: selectedWarehouse.state,
              },
            ].map((item) => (
              <MiniInformationCard key={item.title} {...item} />
            ))}
          </div>
          <MiniInformationCard
            icon={LocateFixed}
            title={"Full Address"}
            information={selectedWarehouse.address}
          />
        </div>
      )}

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

      <MultiStepFormButtons
        {...controls}
        isLoading={isEditOrderLoading || isCreateOrderLoading}
      />
    </form>
  );
};

export default OrderSummary;
