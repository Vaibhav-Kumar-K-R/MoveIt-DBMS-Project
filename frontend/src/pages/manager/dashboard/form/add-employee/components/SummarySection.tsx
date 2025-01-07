import {
  Coins,
  GraduationCap,
  IdCard,
  LocateFixedIcon,
  Lock,
  Mail,
  Map,
  MapPin,
  Phone,
  Pin,
  User2,
  UserRoundSearch,
} from "lucide-react";
import { AddEmployeeFormType } from "../types";
import { Separator } from "@/components/ui/separator";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import MiniInformationCard from "@/components/MiniInformationCard";
import { EMPLOYEE_ROLES } from "@/config/employee";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { useAddEmployeeRequest } from "@/api/ManagersApi";

type SummarySectionProps = {
  employeeData: AddEmployeeFormType;
};

const SummarySection = ({ employeeData }: SummarySectionProps) => {
  const { controls } = useMultiStepFormContext();
  const { addEmployee, isLoading } = useAddEmployeeRequest();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // Append the image file
    if (employeeData.profile_img) {
      formData.append("employeeProfileImg", employeeData.profile_img);
    }

    // Append Personal Details
    formData.append("name", employeeData.name);
    formData.append("dob", employeeData.dob);
    formData.append("email", employeeData.email);
    formData.append("phone", employeeData.phone);
    formData.append("password", employeeData.password);

    // Append Address Details
    formData.append("city", employeeData.city);
    formData.append("state", employeeData.state);
    formData.append("pincode", employeeData.pincode);
    formData.append("address", employeeData.address);

    // Append Work Details
    formData.append(
      "driving_experience",
      employeeData.driving_experience.toString(),
    );
    formData.append("role", employeeData.role);
    formData.append("licence_number", employeeData.licence_number);
    formData.append("salary", employeeData.salary.toString());

    addEmployee(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-xl font-bold mb-2">Verify Employee details</h1>
      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          {[
            { icon: User2, title: "Name", information: employeeData.name },
            { icon: Mail, title: "Email", information: employeeData.email },
            {
              icon: Phone,
              title: "Phone",
              information: formatPhoneNumber(employeeData.phone),
            },
            { icon: Lock, title: "Password", information: "••••••••" },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Address Details</h3>
        <div className="grid grid-cols-1 gap-y-4">
          <MiniInformationCard
            icon={LocateFixedIcon}
            title={"Full Address"}
            information={employeeData.address}
          />
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          {[
            { icon: Map, title: "City", information: employeeData.city },
            { icon: MapPin, title: "State", information: employeeData.state },
            { icon: Pin, title: "Pin Code", information: employeeData.pincode },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Work Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
          {[
            {
              icon: GraduationCap,
              title: "Driving Experience",
              information: `${employeeData.driving_experience} years`,
            },
            {
              icon: IdCard,
              title: "Licence Number",
              information: employeeData.licence_number,
            },
            {
              icon: UserRoundSearch,
              title: "Role",
              information: EMPLOYEE_ROLES[employeeData.role],
            },
            {
              icon: Coins,
              title: "Salary",
              information: formatIndianCurrency(employeeData.salary),
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <MultiStepFormButtons {...controls} isLoading={isLoading} />
    </form>
  );
};

export default SummarySection;
