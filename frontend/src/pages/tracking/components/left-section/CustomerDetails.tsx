import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { Order } from "@/types/order";

type CustomerDetailsProps = {
  order: Order;
};

const CustomerDetails = ({ order }: CustomerDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm text-muted-foreground">Customer Name</h3>
        <p className="font-medium">{order.customer_name}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Customer Contact</h3>
        <p className="font-medium">{formatPhoneNumber(order.customer_phone)}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Delivery Address</h3>
        <p className="font-medium">{order.customer_address}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
