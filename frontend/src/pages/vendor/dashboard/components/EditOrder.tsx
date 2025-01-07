import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit } from "lucide-react";
import OrderForm from "../order-form/OrderForm";
import { useState } from "react";
import { Order } from "@/types/order";
import { OrderFormType } from "../order-form/types";

type EditOrderProps = {
  order: Order;
};

const EditOrder = ({ order }: EditOrderProps) => {
  const [orderData, setOrderData] = useState<OrderFormType>({
    product_name: order.product_name,
    product_description: order.product_description,
    quantity: order.quantity,
    product_img_url: order.product_img_url,
    price_details: {
      product_price: order.price_details.product_price,
      delivery_charge: order.price_details.delivery_charge,
      gst: order.price_details.gst,
    },
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone,
    customer_city: order.customer_city,
    customer_state: order.customer_state,
    customer_address: order.customer_address,
    weight: order.weight,
    order_placed_date: new Date(order.order_placed_date),
    warehouse: order.warehouse,
  });

  const updateOrderData = (data: Partial<OrderFormType>) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      ...data,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogTitle className="text-[1.3rem] font-bold">
          <AppLogo />
        </DialogTitle>
        <ScrollArea className="max-h-[80vh] p-1">
          <OrderForm
            orderData={orderData}
            updateOrderData={updateOrderData}
            formTitle="Edit Order"
            formDescription="Edit the order details below"
            isEditing
            order_id={order._id}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrder;
