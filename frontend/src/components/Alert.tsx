import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type AlertProps = {
  alertTitle: React.ReactNode;
  alertTrigger: React.ReactNode;
  alertDescription: React.ReactNode;
  onAction: () => void;
  onCancel: () => void;
};

const Alert = ({
  alertTrigger,
  alertTitle,
  alertDescription,
  onAction,
  onCancel,
}: AlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{alertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onAction}>Yes</AlertDialogAction>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
