import { Separator } from "@/components/ui/separator";
import DashboardHeader from "./components/DashboardHeader";

const Dashboard = () => {
  return (
    <div className="py-5 space-y-4">
      <DashboardHeader />
      <Separator />
    </div>
  );
};

export default Dashboard;
