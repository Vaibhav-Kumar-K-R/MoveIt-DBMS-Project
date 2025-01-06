import { Separator } from "@/components/ui/separator";
import DashboardHeader from "./components/DashboardHeader";
import EmployeesDetailTable from "./components/EmployeesDetailTable";

const Dashboard = () => {
  return (
    <div className="py-5 space-y-4">
      <DashboardHeader />
      <Separator />
      <EmployeesDetailTable />
    </div>
  );
};

export default Dashboard;
