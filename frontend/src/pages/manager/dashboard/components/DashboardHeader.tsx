import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus } from "lucide-react";
import AddEmployeeForm from "../form/add-employee/AddEmployeeForm";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold">Welcome to your Dashboard</h1>
        <p className="text-zinc-500">Overview of the manager</p>
      </div>
      <Dialog>
        <DialogTrigger>
          <Button>
            <UserPlus /> Create Employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogTitle className="text-[1.3rem] font-bold">
            <AppLogo />
          </DialogTitle>
          <ScrollArea className="max-h-[80vh] p-1">
            <AddEmployeeForm />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardHeader;
