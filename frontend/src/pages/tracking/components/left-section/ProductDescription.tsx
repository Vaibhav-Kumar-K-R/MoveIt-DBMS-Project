import { formatIndianCurrency } from "@/helpers/format-currency";
import { Order } from "@/types/order";

type ProductDescriptionProps = {
  order: Order;
};

const ProductDescription = ({ order }: ProductDescriptionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm text-muted-foreground">Product Name</h3>
        <p className="font-medium">{order.product_name}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Product Description</h3>
        <p className="font-medium">{order.product_description}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Price</h3>
        <p className="font-medium">{formatIndianCurrency(order.price_details.total_price)}</p>
      </div>

      <div>
        <h3 className="text-sm text-muted-foreground">Quantity</h3>
        <p className="font-medium">{order.quantity}</p>
      </div>
    </div>
  );
};

export default ProductDescription;
