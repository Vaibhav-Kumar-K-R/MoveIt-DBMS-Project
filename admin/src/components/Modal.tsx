import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Warehouse {
  id?: string;
  name?: string;
  address?: string;
  pincode?: string;
  city?: string;

  state?: string;
  email: string;
  phone: string;
  status: string;
  manager_id?: string;
}

interface EditWarehouseModalProps {
  warehouse: Warehouse | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedWarehouse: Warehouse) => void;
}
export default function Modal({
  warehouse,
  isOpen,
  onClose,
}: EditWarehouseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Warehouse details</DialogTitle>
          <DialogDescription>
            Make changes to warehouse details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid px-3 gap-4  py-4 h-[150px] relative overflow-y-scroll">
          {warehouse
            ? Object.entries(warehouse).map(([key, value], index) => {
                return (
                  index > 0 && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={key} className="text-right">
                        {key}
                      </Label>
                      <Input
                        id={key}
                        defaultValue={value}
                        className="col-span-3 text-black"
                      />
                    </div>
                  )
                );
              })
            : null}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
