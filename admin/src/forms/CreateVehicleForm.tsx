import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAddVehicleMutation } from "@/api/AdminsApi";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  createVehicleFormSchema,
  CreateVehicleFormData,
} from "@/forms/types/index";

interface FormElementType {
  close: (value: boolean) => void;
}

function CreateWarehouseForm({ close }: FormElementType) {
  const { isLoading: isAddVehicleLoading, addVehicle } =
    useAddVehicleMutation();

  const form = useForm<CreateVehicleFormData>({
    resolver: zodResolver(createVehicleFormSchema),
    defaultValues: {
      number_plate: "",
      vehicleImg: undefined,
      capacity: 0,
      curr_status: "available",
      model: "",
      type: "",
    },
  });

  const onSubmit = async (data: CreateVehicleFormData) => {
    const formData = new FormData();

    formData.append("vehicleImg", data.vehicleImg);
    formData.append("number_plate", data.number_plate);
    formData.append("capacity", data.capacity.toString());
    formData.append("curr_status", data.curr_status);
    formData.append("model", data.model);
    formData.append("type", data.type);

    await addVehicle(data);
    close(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="number_plate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Number Plate (like KA 01 AB 1234)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter number plate"
                  {...field}
                  className={fieldState.error ? "border-red-600" : ""}
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleImg"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Vehicle Image
              </FormLabel>
              <FormControl>
                <Input
                  className={fieldState.error ? "border-red-600" : ""}
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null,
                    )
                  }
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Capacity
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter capacity"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className={fieldState.error ? "border-red-600" : ""}
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Model
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter vehicle model"
                  {...field}
                  className={fieldState.error ? "border-red-600" : ""}
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Type
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter vehicle type"
                  {...field}
                  className={fieldState.error ? "border-red-600" : ""}
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={`w-full ${isAddVehicleLoading && "opacity-80"}`}
        >
          {isAddVehicleLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="flex items-center justify-center gap-1">
              Create
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default CreateWarehouseForm;
