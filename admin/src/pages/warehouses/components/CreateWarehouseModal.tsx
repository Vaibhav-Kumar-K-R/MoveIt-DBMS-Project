import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useGetWarehouseManagersListRequest } from "@/api/AdminsApi";
import { ManagerListType } from "@/pages/warehouses/types/index";
import CreateWarehouseForm from "@/forms/CreateWarehouseForm";
interface CreateWarehouseModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export default function CreateWarehouseModal({
  isOpen,
  onClose,
}: CreateWarehouseModalProps) {
  const [managersList, setManagerList] = useState<ManagerListType[]>([]);
  const { response } = useGetWarehouseManagersListRequest();

  useEffect(() => {
    if (response) {
      setManagerList(response.message);
    }
  }, [response]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Warehouse details</DialogTitle>
          <DialogDescription>
            Enter the warehouse details here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[60vh] px-3 relative overflow-y-scroll">
          <CreateWarehouseForm
            managers={managersList}
            close={onClose}
          ></CreateWarehouseForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
