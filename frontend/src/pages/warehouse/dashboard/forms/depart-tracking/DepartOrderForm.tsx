import { useGetAllDriversRequest } from "@/api/EmployeesApi";
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
import { Building2, Car, Loader2, TextQuote, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import { departTrackingFormSchema, DepartTrackingFormValues } from "./types";
import { cn } from "@/lib/utils";
import { useGetAllVehicles } from "@/api/VehicleApi";
import { useOrderDepartureRequest } from "@/api/WarehousesApi";

const DepartOrderForm = () => {
  const form = useForm<DepartTrackingFormValues>({
    resolver: zodResolver(departTrackingFormSchema),
    defaultValues: {
      shippingId: "SHIPPING_",
      employeeId: "",
      vehicleId: "",
    },
  });
  const { allDrivers } = useGetAllDriversRequest();
  const { allVehicles } = useGetAllVehicles();
  const { departOrder, isLoading } = useOrderDepartureRequest();

  const onSubmit = async (data: DepartTrackingFormValues) => {
    console.log(data);
    departOrder(data);
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

        {/* Driver Field */}
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver *</FormLabel>
              <div className="flex items-center border rounded-md px-3 py-2 h-16">
                <Building2 className="mr-2 text-gray-500" />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14">
                      <SelectValue placeholder="Select Driver" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allDrivers?.drivers.map((driver) => (
                      <SelectItem
                        key={driver._id}
                        value={driver._id}
                        className="cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className="size-10 rounded-full"
                            src={driver.profile_img.profile_img_url}
                            alt={driver.name}
                          />
                          <div className="flex flex-col items-start">
                            <p className="font-semibold">{driver.name}</p>
                            <p className="text-xs text-zinc-500">
                              {driver.city}, {driver.state}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormDescription>
                Select the driver assigned to the order
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle *</FormLabel>
              <div className="flex items-center border rounded-md px-3 py-2 h-16">
                <Car className="mr-2 text-gray-500" />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14">
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allVehicles?.vehicles.map((vehicle) => (
                      <SelectItem
                        key={vehicle._id}
                        value={vehicle._id}
                        className="cursor-pointer gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className="size-10 rounded-full"
                            src={vehicle.vehicle_img.vehicle_img_url}
                            alt={vehicle.model}
                          />
                          <div className="flex flex-col items-start">
                            <p className="font-semibold">
                              {vehicle.type}, {vehicle.model}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {vehicle.number_plate}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <FormDescription>
                Select the vehicle that will be used to transport the order
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
            isLoading ? "bg-opacity-75" : "bg-opacity-100",
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

export default DepartOrderForm;
