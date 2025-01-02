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
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id} className="cursor-pointer">
                <TableCell className="font-medium py-4">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {order.product_name}
                </TableCell>
                <TableCell>{ORDER_STATUS[order.status]}</TableCell>
                <TableCell>
                  {formatIndianCurrency(order.price_details.total_price)}
                </TableCell>
                <TableCell>{formatDate(order.order_placed_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrderDetails;
