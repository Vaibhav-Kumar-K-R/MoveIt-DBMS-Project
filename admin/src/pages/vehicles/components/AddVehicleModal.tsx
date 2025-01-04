import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateVehicleForm from "@/forms/CreateVehicleForm";
interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export default function AddVehicleModal({
  isOpen,
  onClose,
}:  AddVehicleModalProps) {



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Vehicle details</DialogTitle>
          <DialogDescription>
            Enter the vehicle details here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[60vh] px-3 relative overflow-y-scroll">
          <CreateVehicleForm
            close={onClose}
          ></CreateVehicleForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
