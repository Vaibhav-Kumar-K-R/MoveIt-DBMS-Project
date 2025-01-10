import { Separator } from "@/components/ui/separator";
import DashboardHeader from "./components/DashboardHeader";
import OrdersTable from "./components/OrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackingsTable from "./components/TrackingsTable";

const Dashboard = () => {
  return (
    <div className="py-5 space-y-4">
      <DashboardHeader />
      <Separator />
      <Tabs defaultValue="orders">
        <TabsList className="flex">
          <TabsTrigger className="flex-1" value="orders">
            Orders
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="trackings">
            Trackings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrdersTable />
        </TabsContent>
        <TabsContent value="trackings">
          <TrackingsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
