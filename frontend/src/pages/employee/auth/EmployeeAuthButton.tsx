import { useEmployeeAuth, useEmployeeLogoutRequest } from "@/api/EmployeesApi";
import AuthButton from "@/components/AuthButton";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EMPLOYEE_ROLES } from "@/config/employee";
import { cn } from "@/lib/utils";
import { CheckCircle2, UserPen } from "lucide-react";
import { Link } from "react-router-dom";
import AddTrackingButton from "../add-tracking/components/AddTrackingButton";

const EmployeeAuthButton = () => {
  const { employee, isLoading } = useEmployeeAuth();
  const { logoutEmployee, isLoading: isLogoutLoading } =
    useEmployeeLogoutRequest();

  if (isLoading || !employee) {
    return null;
  }

  return (
    <AuthButton
      {...employee}
      imageUrl={employee.profile_img.profile_img_url}
      logOut={logoutEmployee}
      isLogoutLoading={isLogoutLoading}
    >
      <div>
        <p className="text-sm text-zinc-500 flex justify-between items-center gap-2">
          <span className="flex items-center gap-2 font-semibold text-zinc-800">
            <CheckCircle2 size={16} /> Role
          </span>
          Employee ({EMPLOYEE_ROLES[employee.role]})
        </p>
      </div>
      <Separator />
      <Link
        to={`/employee/profile`}
        className={cn(
          "w-full border hover:bg-zinc-100",
          buttonVariants({
            variant: "ghost",
          })
        )}
      >
        <UserPen /> View Profile
      </Link>
      {employee.role === "driver" && <AddTrackingButton />}
    </AuthButton>
  );
};

export default EmployeeAuthButton;
