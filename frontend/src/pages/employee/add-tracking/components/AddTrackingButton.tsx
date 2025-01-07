import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddTrackingForm from "../AddTrackingForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

const AddTrackingButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          Add Tracking <Truck />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex items-center gap-2 text-2xl font-semibold">
          Add a New Tracking <Truck />
        </DialogTitle>
        <AddTrackingForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddTrackingButton;
