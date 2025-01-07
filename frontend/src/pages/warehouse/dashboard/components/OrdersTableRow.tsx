import { useUpdateOrderStatusRequest } from "@/api/WarehousesApi";
import Alert from "@/components/Alert";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/helpers/format-date";
import OrderDetails from "@/pages/vendor/dashboard/components/OrderDetails";
import { Order } from "@/types/order";
import { Check, X } from "lucide-react";

type OrderDetailsProps = {
  order: Order;
  index: number;
};

const OrdersTableRow = ({ order, index }: OrderDetailsProps) => {
  const { acceptOrder, rejectOrder } = useUpdateOrderStatusRequest(order._id);

  return (
    <Dialog key={order._id}>
      <TableRow>
        <TableCell className="font-medium">{index + 1}</TableCell>
        <DialogTrigger asChild>
          <TableCell className="font-medium cursor-pointer hover:underline w-[450px] line-clamp-1 overflow-hidden my-4">
            {order.product_name}
          </TableCell>
        </DialogTrigger>
        <TableCell>{order.shipping_id}</TableCell>
        <TableCell>{formatDate(order.order_placed_date)}</TableCell>
        <TableCell>
          <Alert
            alertTitle="Are you sure you want to Accept this Order?"
            alertTrigger={
              <Button variant="outline" size="icon">
                <Check className="text-green-500 size-10" />
              </Button>
            }
            alertDescription={
              <>
                Please verify the order details before accepting it.
                <br />
                This action cannot be undone.
              </>
            }
            onAction={acceptOrder}
            onCancel={() => {}}
          />
        </TableCell>
        <TableCell>
          <Alert
            alertTitle="Are you sure you want to Reject this Order?"
            alertTrigger={
              <Button variant="outline" size="icon">
                <X className="text-red-600 size-10" />
              </Button>
            }
            alertDescription={
              <>
                Please verify the order details before rejecting it.
                <br />
                This action cannot be undone.
              </>
            }
            onAction={rejectOrder}
            onCancel={() => {}}
          />
        </TableCell>
      </TableRow>
      <DialogContent className="sm:max-w-[625px]">
        <DialogTitle className="text-[1.3rem] font-bold">
          <AppLogo />
        </DialogTitle>
        <ScrollArea className="max-h-[80vh] p-1">
          <OrderDetails order={order} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersTableRow;
