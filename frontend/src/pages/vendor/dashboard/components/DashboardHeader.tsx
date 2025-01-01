import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import CreateOrderForm from "../order-form/CreateOrderForm";
import AppLogo from "@/components/AppLogo";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Welcome to your Dashboard</h1>
        <p className="text-zinc-500">Overview of your store</p>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button>
            <Plus /> Create Order
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogTitle className="text-[1.3rem] font-bold">
            <AppLogo />
          </DialogTitle>
          <ScrollArea className="max-h-[80vh] p-1">
            <CreateOrderForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardHeader;
