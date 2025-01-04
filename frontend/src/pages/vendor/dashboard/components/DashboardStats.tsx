import { CheckCircle, IndianRupee, Package, ShoppingCart } from "lucide-react";
import StatsCard from "./StatsCard";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { formatNumber } from "@/helpers/format-number";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {
          icon: ShoppingCart,
          title: "Total Orders",
          information: formatNumber(1200),
        },
        {
          icon: Package,
          title: "Total Active Orders",
          information: formatNumber(150),
        },
        {
          icon: IndianRupee,
          title: "Total Revenue",
          information: formatIndianCurrency(180000),
        },
        {
          icon: CheckCircle,
          title: "Total Orders Delivered",
          information: formatNumber(1050),
        },
      ].map((item, index) => (
        <StatsCard key={index} {...item} />
      ))}
    </div>
  );
};

export default DashboardStats;
