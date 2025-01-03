import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateManagerForm from "@/forms/CreateManagerForm";
interface CreateManagerModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export default function CreateManagerModal({
  isOpen,
  onClose,
}: CreateManagerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Manager details</DialogTitle>
          <DialogDescription>
            Enter the manager details here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[60vh] px-3 relative overflow-y-scroll">
          <CreateManagerForm close={onClose}></CreateManagerForm>
        </div>
      </DialogContent>
    </Dialog>
  );
}
