import { Separator } from "@/components/ui/separator";
import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RecentOrderDetails from "./components/RecentOrderDetails";

const Dashboard = () => {
  return (
    <div className="py-5 space-y-4">
      <DashboardHeader />
      <Separator />
      <DashboardStats />
      <Separator />
      <div>
        {/* Chart Stuff here */}
        Charts (if needed)
      </div>
      <Separator />
      <RecentOrderDetails />
    </div>
  );
};

export default Dashboard;
