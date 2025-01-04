import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useUpdateManagerStatusMutation } from "@/api/AdminsApi";
const FormSchema = z.object({
  work_status: z.string().min(1, "Please select the status of the manager"), 
});

interface UpdateManagerStatusModalProps {
  email: string;
  status: string;
  isOpen: boolean;
  onClose: (state: boolean) => void;
}

export default function UpdateManagerWorkStatus({
  email,
  status,
  isOpen,
  onClose,
}: UpdateManagerStatusModalProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { work_status: "" }, 
  });

  const {updateManagerStatus,isLoading} = useUpdateManagerStatusMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {

   const newData={...data,email:email}
   await  updateManagerStatus(newData);
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Manager Status</DialogTitle>
          <DialogDescription>
            Currently manager status is{" "}
            {status === "working" ? (
              <p className="text-green-500 font-semibold text-md">Working</p>
            ) : status === "terminated" ? (
              <p className="text-red-500 font-semibold text-md">Terminated</p>
            ) : (
              <p className="text-yellow-500 text-md font-semibold">Resigned</p>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)} // Properly handle form submission
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="work_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select status</FormLabel>
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
                          {["working", "terminated", "resigned"].map((item) =>
                            status !== item ? (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ) : null
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className={`${isLoading?"opacity-80":""} w-full`}>
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
