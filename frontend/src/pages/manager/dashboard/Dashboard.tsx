import { Separator } from "@/components/ui/separator";
import DashboardHeader from "./components/DashboardHeader";
import EmployeesDetail from "./components/EmployeesDetail";

const Dashboard = () => {
  return (
    <div className="py-5 space-y-4">
      <DashboardHeader />
      <Separator />
      <EmployeesDetail />
    </div>
  );
};

export default Dashboard;
