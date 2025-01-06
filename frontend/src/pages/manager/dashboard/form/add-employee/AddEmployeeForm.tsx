import MultiStepFormContextProvider from "@/context/MultiStepFormContext";
import PersonalDetailsSection from "./components/PersonalDetailsSection";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { AddEmployeeFormType } from "./types";
import AddressDetailsSection from "./components/AddressDetailsSection";
import WorkDetailsSection from "./components/WorkDetailsSection";
import SummarySection from "./components/SummarySection";

const AddEmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState<AddEmployeeFormType>({
    profile_img: undefined,
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    dob: "1999-01-01",
    password: "hello123",
    confirm_password: "hello123",
    city: "Mysuru",
    state: "Karnataka",
    pincode: "800000",
    address: "123 Main Street",
    driving_experience: 0,
    licence_number: "",
    salary: 0,
    role: "driver",
  });

  const updateEmployeeData = (data: Partial<AddEmployeeFormType>) => {
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      ...data,
    }));
  };

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
        <SummarySection employeeData={employeeData} />,
      ]}
    >
      <MultiStepForm
        formHeader={
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-[1.7rem] font-bold flex items-center gap-2">
              <div className="flex items-center gap-2">
                <UserPlus />
                <h1 className="text-2xl font-bold">Create Employee</h1>
              </div>
            </h1>
            <p className="text-muted-foreground text-gray-400 text-[0.9rem]">
              Create an employee account
            </p>
          </div>
        }
      />
    </MultiStepFormContextProvider>
  );
};

export default AddEmployeeForm;
