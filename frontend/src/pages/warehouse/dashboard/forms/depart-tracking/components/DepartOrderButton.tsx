import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DepartOrderForm from "../DepartOrderForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const DepartOrderButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          Depart Order <Truck />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[82vh] overflow-hidden">
        <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
          Depart Order <Truck />
        </DialogTitle>
        <ScrollArea className="h-full px-2">
          <DepartOrderForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DepartOrderButton;
