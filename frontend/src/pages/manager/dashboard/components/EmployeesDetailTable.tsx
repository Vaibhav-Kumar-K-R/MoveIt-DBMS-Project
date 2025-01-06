import { useGetEmployeesRequest } from "@/api/ManagersApi";
import AppLogo from "@/components/AppLogo";
import PageControls from "@/components/PageControls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EMPLOYEE_ROLES, EMPLOYEE_WORK_STATUS } from "@/config/employee";
import { formatIndianCurrency } from "@/helpers/format-currency";
import { Edit } from "lucide-react";
import { useState } from "react";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployeeDetails from "./EditEmployeeDetails";

const EmployeesDetailTable = () => {
  const [page, setPage] = useState<number>(1);
  const { employeeData, isLoading } = useGetEmployeesRequest(page);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!employeeData) {
    return <>No Employees Found</>;
  }

  const {
    employees,
    pagination: { pages },
  } = employeeData;

  const nextPage = () => {
    if (page < pages) {
      setPage((page) => page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <h2 className="text-[1.3rem] font-semibold">
          Recently Added Employees
        </h2>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableCaption>A list of Employees added by you.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Work Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((employee, index) => (
              <Dialog>
                <TableRow>
                  <TableCell className="font-medium pl-2">
                    {index + 1}
                  </TableCell>
                  <DialogTrigger>
                    <TableCell className="font-medium cursor-pointer hover:underline overflow-hidden py-4 pl-2">
                      {employee.name}
                    </TableCell>
                  </DialogTrigger>
                  <TableCell className="pl-2">
                    {formatIndianCurrency(employee.salary)}
                  </TableCell>
                  <TableCell className="pl-2">
                    {EMPLOYEE_ROLES[employee.role]}
                  </TableCell>
                  <TableCell className="pl-2">{employee.email}</TableCell>
                  <TableCell className="pl-2">
                    {EMPLOYEE_WORK_STATUS[employee.work_status]}
                  </TableCell>
                  <TableCell className="pl-2">
                    <EditEmployeeDetails employee={employee} />
                  </TableCell>
                </TableRow>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogTitle className="text-[1.3rem] font-bold">
                    <AppLogo />
                  </DialogTitle>
                  <ScrollArea className="max-h-[80vh] p-1">
                    <EmployeeDetails employee={employee} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-center mt-5">
          <PageControls
            nextPage={nextPage}
            prevPage={prevPage}
            goToPage={goToPage}
            totalPages={pages}
            currPage={page}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeesDetailTable;
