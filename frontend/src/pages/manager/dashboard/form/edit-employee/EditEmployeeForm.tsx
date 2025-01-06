import MultiStepFormContextProvider from "@/context/MultiStepFormContext";
import PersonalDetailsSection from "./components/PersonalDetailsSection";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Edit } from "lucide-react";
import { EditEmployeeFormType } from "./types";
import AddressDetailsSection from "../add-employee/components/AddressDetailsSection";
import WorkDetailsSection from "../add-employee/components/WorkDetailsSection";
import SummarySection from "./components/SummarySection";

type EditEmployeeFormProps = {
  employeeData: EditEmployeeFormType;
  employee_id: string;
  updateEmployeeData: (data: Partial<EditEmployeeFormType>) => void;
};

const EditEmployeeForm = ({
  employeeData,
  employee_id,
  updateEmployeeData,
}: EditEmployeeFormProps) => {
  return (
    <MultiStepFormContextProvider
      stepsArray={[
        <PersonalDetailsSection
          employeeData={employeeData}
          updateEmployeeData={updateEmployeeData}
        />,
        <AddressDetailsSection
          employeeData={employeeData}
          updateEmployeeData={updateEmployeeData}
        />,
        <WorkDetailsSection
          employeeData={employeeData}
          updateEmployeeData={updateEmployeeData}
        />,
        <SummarySection employeeData={employeeData} employee_id={employee_id} />,
      ]}
    >
      <MultiStepForm
        formHeader={
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-[1.7rem] font-bold flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Edit />
                <h1 className="text-2xl font-bold">Edit Employee</h1>
              </div>
            </h1>
            <p className="text-muted-foreground text-gray-400 text-[0.9rem]">
              Update your employee details
            </p>
          </div>
        }
      />
    </MultiStepFormContextProvider>
  );
};

export default EditEmployeeForm;
