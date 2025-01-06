import MiniInformationCard from "@/components/MiniInformationCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EMPLOYEE_ROLES } from "@/config/employee";
import { avatarFallbackColor } from "@/constants/avatar-colors";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { formatPhoneNumber } from "@/helpers/format-phone-number";
import { cn } from "@/lib/utils";
import { EmployeeType } from "@/types/employee";
import {
  Mail,
  User2,
  Phone,
  Lock,
  LocateFixedIcon,
  Map,
  MapPin,
  Pin,
  UserRoundSearch,
  GraduationCap,
  IdCard,
  Coins,
} from "lucide-react";

type EmployeeDetailsProps = {
  employee: EmployeeType;
};

const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Employee details</h1>
      <Separator className="my-4" />

      <div>
        <h3 className="text-lg font-semibold">Profile Picture</h3>
        <div className="flex items-center justify-center">
          <Avatar className="size-32">
            <AvatarImage src={employee.profile_img.profile_img_url} />
            <AvatarFallback className={cn("text-5xl", avatarFallbackColor())}>
              {employee.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          {[
            { icon: User2, title: "Name", information: employee.name },
            { icon: Mail, title: "Email", information: employee.email },
            {
              icon: Phone,
              title: "Phone",
              information: formatPhoneNumber(employee.phone),
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
            information={employee.address}
          />
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          {[
            { icon: Map, title: "City", information: employee.city },
            { icon: MapPin, title: "State", information: employee.state },
            { icon: Pin, title: "Pin Code", information: employee.pincode },
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
              information: `${employee.driving_experience} years`,
            },
            {
              icon: IdCard,
              title: "Licence Number",
              information: employee.licence_number,
            },
            {
              icon: UserRoundSearch,
              title: "Role",
              information: EMPLOYEE_ROLES[employee.role],
            },
            {
              icon: Coins,
              title: "Salary",
              information: formatIndianCurrency(employee.salary),
            },
          ].map((item) => (
            <MiniInformationCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
