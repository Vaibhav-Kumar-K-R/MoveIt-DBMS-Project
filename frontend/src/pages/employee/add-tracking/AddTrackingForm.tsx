import {
  useAddTrackingRequest,
  useGetAllWarehousesRequest,
} from "@/api/EmployeesApi";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader2, TextQuote, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { addTrackingFormSchema, AddTrackingFormValues } from "./types";
import { cn } from "@/lib/utils";

const AddTrackingForm = () => {
  const form = useForm<AddTrackingFormValues>({
    resolver: zodResolver(addTrackingFormSchema),
    defaultValues: {
      shippingId: "SHIPPING_",
      warehouse: "",
    },
  });
  const { allWarehouses } = useGetAllWarehousesRequest();
  const { addTracking, isLoading } = useAddTrackingRequest();

  const onSubmit = async (data: AddTrackingFormValues) => {
    addTracking(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Shipping ID Field */}
        <FormField
          control={form.control}
          name="shippingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping ID *</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <TextQuote className="mr-2 text-gray-500" />
                  <Input
                    placeholder="Enter Shipping ID"
                    type="text"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter the Shipping ID of the order
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Warehouse Field */}
        <FormField
          control={form.control}
          name="warehouse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse *</FormLabel>
              <div className="flex items-center border rounded-md px-3 py-2 h-16">
                <Building2 className="mr-2 text-gray-500" />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14">
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allWarehouses?.warehouses.map((warehouse) => (
                      <SelectItem
                        key={warehouse._id}
                        value={warehouse._id}
                        className="cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className="size-10 rounded-full"
                            src={warehouse.profile_img.profile_img_url}
                            alt={warehouse.name}
                          />
                          <div className="flex flex-col items-start">
                            <p className="font-semibold">{warehouse.name}</p>
                            <p className="text-xs text-zinc-500">
                              {warehouse.city}, {warehouse.state}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormDescription>
                Select the warehouse where the order is currently located
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-full",
            isLoading ? "bg-opacity-75" : "bg-opacity-100"
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" /> Adding Tracking...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Truck /> Add Tracking
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddTrackingForm;
