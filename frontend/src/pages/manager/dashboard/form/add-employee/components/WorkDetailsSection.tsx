import { useForm } from "react-hook-form";
import { workDetailsSchema, WorkDetailsType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Coins, GraduationCap, IdCard, UserRoundSearch } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WorkDetailsSectionProps = {
  employeeData: WorkDetailsType;
  updateEmployeeData: (data: WorkDetailsType) => void;
};

const WorkDetailsSection = ({
  employeeData,
  updateEmployeeData,
}: WorkDetailsSectionProps) => {
  const form = useForm<WorkDetailsType>({
    resolver: zodResolver(workDetailsSchema),
    defaultValues: employeeData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: WorkDetailsType) => {
    updateEmployeeData(data);
    if (!isLastStep) next();
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <h1 className="text-xl font-bold mb-2">Address Details</h1>

          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="driving_experience"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Years of Driving Experience *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <GraduationCap className="mr-2 text-gray-500" />
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        className="w-full text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    How many years of driving experience do employee have?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licence_number"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Licence Number *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <IdCard className="mr-2 text-gray-500" />
                      <Input
                        type="text"
                        placeholder="KA-01-1234567890"
                        {...field}
                        className="w-full text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter employee's licence number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Salary *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <Coins className="mr-2 text-gray-500" />
                      <Input
                        type="number"
                        placeholder="100000"
                        {...field}
                        className="w-full text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter employee's Salary</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Role *</FormLabel>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <UserRoundSearch className="mr-2 text-gray-500" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="cursor-pointer" value="driver">
                          Driver
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="delivery_boy"
                        >
                          Delivery Boy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormDescription>Enter employee's Salary</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <MultiStepFormButtons {...controls} />
        </form>
      </Form>
    </div>
  );
};

export default WorkDetailsSection;
