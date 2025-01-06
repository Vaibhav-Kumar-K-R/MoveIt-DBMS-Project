import AppLogo from "@/components/AppLogo";
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

const EmployeesDetail = () => {
  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <h2 className="text-[1.3rem] font-semibold">Recent Orders</h2>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableCaption>A list of your recent orders.</TableCaption>
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
            <Dialog>
              <TableRow>
                <TableCell className="font-medium pl-2">1</TableCell>
                <DialogTrigger asChild>
                  <TableCell className="font-medium cursor-pointer hover:underline overflow-hidden py-4 pl-2">
                    Product Name
                  </TableCell>
                </DialogTrigger>
                <TableCell className="pl-2">lorem ipsum</TableCell>
                <TableCell className="pl-2">10900</TableCell>
                <TableCell className="pl-2">haosfjadlfs</TableCell>
                <TableCell className="pl-2">sfasdasda</TableCell>
                <TableCell className="pl-2">hello</TableCell>
              </TableRow>
              <DialogContent className="sm:max-w-[625px]">
                <DialogTitle className="text-[1.3rem] font-bold">
                  <AppLogo />
                </DialogTitle>
                <ScrollArea className="max-h-[80vh] p-1">
                  {/* Employee Details */}
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeesDetail;
