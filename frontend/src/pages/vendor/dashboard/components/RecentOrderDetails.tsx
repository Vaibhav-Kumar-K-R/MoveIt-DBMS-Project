import { useGetRecentOrdersRequest } from "@/api/VendorsApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/helpers/format-date";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { ORDER_STATUS } from "@/config/order";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrderDetails from "./OrderDetails";
import AppLogo from "@/components/AppLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditOrder from "./EditOrder";

const RecentOrderDetails = () => {
  const { recentOrders, isLoading } = useGetRecentOrdersRequest();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!recentOrders || recentOrders.orders.length === 0) {
    return <p>No recent orders found.</p>;
  }

  const { orders } = recentOrders;

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <h2 className="text-[1.3rem] font-semibold">Recent Orders</h2>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Order Placed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <Dialog key={order._id}>
                <TableRow>
                  <TableCell className="font-medium py-4">
                    {index + 1}
                  </TableCell>
                  <DialogTrigger asChild>
                    <TableCell
                      key={order._id}
                      className="font-medium cursor-pointer hover:underline"
                    >
                      {order.product_name}
                    </TableCell>
                  </DialogTrigger>
                  <TableCell>{ORDER_STATUS[order.status]}</TableCell>
                  <TableCell>
                    {formatIndianCurrency(order.price_details.total_price)}
                  </TableCell>
                  <TableCell>{formatDate(order.order_placed_date)}</TableCell>
                  <TableCell>
                    <EditOrder order={order} />
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrderDetails;
