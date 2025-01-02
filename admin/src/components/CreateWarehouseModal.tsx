import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createWarehouseFormSchema,
  CreateWarehouseFormData,
} from "@/pages/warehouses/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateWarehouseMutation } from "@/api/AdminsApi";

interface CreateWarehouseModalProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export default function CreateWarehouseModal({
  isOpen,
  onClose,
}: CreateWarehouseModalProps) {
  const { isLoading: isCreateWarehouseLoading, createWarehouse } =
    useCreateWarehouseMutation();
  const form = useForm<CreateWarehouseFormData>({
    resolver: zodResolver(createWarehouseFormSchema),
    defaultValues: {
      warehouseProfileImg: undefined,
      name: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      email: "",
      password: "",
      phone: "",
      manager_id: "",
      status: "open",
    },
  });

  const onSubmit = async (data: CreateWarehouseFormData) => {
    const formData = new FormData();

    formData.append("warehouseProfileImg", data.warehouseProfileImg);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("manager_id", data.manager_id);
    formData.append("status", data.status);

    createWarehouse(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Warehouse details</DialogTitle>
          <DialogDescription>
            Enter the warehouse details here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="h-[200px] px-3 relative overflow-y-scroll">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Warehouse Image */}
              <FormField
                control={form.control}
                name="warehouseProfileImg"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={fieldState.error ? "border-red-600" : ""}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          field.onChange(
                            event.target.files ? event.target.files[0] : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter name"
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

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
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
              {/* Pincode */}
              <FormField
                control={form.control}
                name="pincode"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Pincode
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter pincode"
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
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter city"
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

              {/* Pincode Field */}

              <FormField
                control={form.control}
                name="state"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      State
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter State"
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
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        type="email"
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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        type="password"
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

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
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
              {/* Manager Id */}
              <FormField
                control={form.control}
                name="manager_id"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={fieldState.error ? "text-red-600" : ""}
                    >
                      Manager ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter manager_id"
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

              {/* Submit Button */}
              <Button
                onClick={() => {}}
                type="submit"
                className={`w-full ${isCreateWarehouseLoading && "opacity-80"}`}
              >
                {isCreateWarehouseLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center justify-center gap-1">
                    Create
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
