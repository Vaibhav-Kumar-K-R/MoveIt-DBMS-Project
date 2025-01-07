import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DepartOrderButton from "../forms/depart-tracking/components/DepartOrderButton";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Welcome to the Dashboard</h1>
        <p className="text-zinc-500">Overview of the warehouse</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5">
          <DropdownMenuItem
            asChild
            className="px-5 py-2 font-semibold flex items-center justify-center focus:bg-zinc-200 cursor-pointer"
          >
            <DepartOrderButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
