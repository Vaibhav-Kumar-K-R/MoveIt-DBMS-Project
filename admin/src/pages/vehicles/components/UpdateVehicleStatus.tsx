import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUpdateVehicleStatusMutation } from "@/api/AdminsApi";
const FormSchema = z.object({
  status: z.string(),
});

interface UpdateVehicleStatusModalProps {
  number_plate: string;
  status: string;
  isOpen: boolean;
  onClose: (state: boolean) => void;
}

export default function UpdateVehicleWorkStatus({
  number_plate,
  status,
  isOpen,
  onClose,
}: UpdateVehicleStatusModalProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { status: "" },
  });

  const { updateVehicle, isLoading } = useUpdateVehicleStatusMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newData = { ...data, number_plate: number_plate };
    console.log(newData);
    await updateVehicle(newData);
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Vehicle Status</DialogTitle>
          <DialogDescription>
            Currently vehicle status is{" "}
            {status === "available" ? (
              <span className="text-green-500  font-semibold text-md px-2 py-1 rounded">
                Available
              </span>
            ) : status === "in_use" ? (
              <span className="text-yellow-500  font-semibold text-md px-2 py-1 rounded">
                In Use
              </span>
            ) : status === "in_maintenance" ? (
              <span className="text-blue-500 font-semibold text-md px-2 py-1 rounded">
                In Maintenance
              </span>
            ) : (
              <span className="tex-red-500  font-semibold text-md px-2 py-1 rounded">
                Not Available
              </span>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)} // Properly handle form submission
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select vehicle status</FormLabel>
                      <Select
                        onValueChange={field.onChange} // Update form value on selection
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status to update" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            { name: "Available", value: "available" },
                            { name: "In  use", value: "in_use" },
                            { name: "In maintanence", value: "in_maintenance" },
                            { name: "Not available", value: "not_available" },
                          ].map((item: { name: string; value: string }) =>
                            status !== item.value ? (
                              <SelectItem key={item.value} value={item.value}>
                                <p className="text-black font-semibold">
                                  {item.name}
                                </p>
                              </SelectItem>
                            ) : null,
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className={`${isLoading ? "opacity-80" : ""} w-full`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      Update
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
