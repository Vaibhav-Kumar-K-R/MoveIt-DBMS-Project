import { EmployeeType } from "@/types/employee";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppLogo from "@/components/AppLogo";
import EditEmployeeForm from "../form/edit-employee/EditEmployeeForm";
import { EditEmployeeFormType } from "../form/edit-employee/types";

type EditEmployeeDetailsProps = {
  employee: EmployeeType;
};

const EditEmployeeDetails = ({ employee }: EditEmployeeDetailsProps) => {
  const [employeeData, setEmployeeData] = useState<EditEmployeeFormType>({
    name: employee.name,
    email: employee.email,
    phone: employee.phone,
    dob: employee.dob,
    address: employee.address,
    city: employee.city,
    state: employee.state,
    pincode: employee.pincode,
    role: employee.role,
    driving_experience: employee.driving_experience,
    licence_number: employee.licence_number,
    salary: employee.salary,
    profile_img: undefined,
  });

  const updateEmployeeData = (data: Partial<EditEmployeeFormType>) => {
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      ...data,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogTitle className="text-[1.3rem] font-bold">
          <AppLogo />
        </DialogTitle>
        <ScrollArea className="max-h-[80vh] p-1">
          <EditEmployeeForm
            employeeData={employeeData}
            updateEmployeeData={updateEmployeeData}
            employee_id={employee._id}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeDetails;
