import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useUpdateWarehouseMutation } from "@/api/AdminsApi";

interface UpdateWarehouseModalProps {
  email: string;
  status: string;
  isOpen: boolean;
  onClose: (state: boolean) => void;
}

export default function EditModal({
  email,
  status,
  isOpen,
  onClose,
}: UpdateWarehouseModalProps) {
  const { updateWarehouse, isLoading } = useUpdateWarehouseMutation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Warehouse status</DialogTitle>
          <DialogDescription>
            Currently warehouse is{" "}
            <p
              className={
                status === "open"
                  ? `font-semibold inline text-green-500`
                  : `font-semibold inline text-red-500`
              }
            >
              {status}
            </p>
            ?. Do you want to update status as{" "}
            <p
              className={
                status === "open"
                  ? `font-semibold inline text-red-500`
                  : `font-semibold inline text-green-500`
              }
            >
              {status === "open" ? "closed" : "open"}
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              updateWarehouse(email);
              onClose(false);
            }}
            type="submit"
            className={`w-full ${isLoading && "opacity-80"}`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-1">
                Update
              </span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
