import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { Order } from "@/types/customer";

type SellerDetailsProps = {
  order: Order;
};

const SellerDetails = ({ order }: SellerDetailsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm text-muted-foreground">Seller Name</h3>
        <p className="font-medium">{order.vendor.shop_name}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Seller Descritpion</h3>
        <p className="font-medium">{order.vendor.shop_description}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Seller Support</h3>
        <p className="font-medium">{formatPhoneNumber(order.vendor.phone)}</p>
        <p className="text-sm text-muted-foreground">{order.vendor.email}</p>
      </div>
    </div>
  );
};

export default SellerDetails;
