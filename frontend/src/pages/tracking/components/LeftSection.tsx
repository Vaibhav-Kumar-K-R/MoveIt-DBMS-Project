import { Order } from "@/types/customer";
import { Separator } from "@/components/ui/separator";
import ProductDescription from "./left-section/ProductDescription";
import CustomerDetails from "./left-section/CustomerDetails";
import SellerDetails from "./left-section/SellerDetails";

type LeftSectionProps = {
  order: Order;
};

const LeftSection = ({ order }: LeftSectionProps) => {
  return (
    <div className="space-y-5 md:border-r pr-6">
      <div className="flex items-center gap-2">
        <img
          src={order.product_img_url}
          alt="Store Logo"
          className="dark:invert border rounded-md border-zinc-200 object-cover h-56"
        />
      </div>

      <Separator />
      <ProductDescription order={order} />
      <Separator />
      <CustomerDetails order={order} />
      <Separator />
      <SellerDetails order={order} />
    </div>
  );
};

export default LeftSection;
