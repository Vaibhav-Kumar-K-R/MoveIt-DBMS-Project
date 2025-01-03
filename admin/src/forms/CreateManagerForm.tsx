import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useCreateManagerMutation } from "@/api/AdminsApi";
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
  CreateManagerFormData,
  createManagerFormSchema,
} from "@/forms/types/index";
interface FormElementType {
  close: (value: boolean) => void;
}

function CreateManagerForm({ close }: FormElementType) {
  const form = useForm<CreateManagerFormData>({
    resolver: zodResolver(createManagerFormSchema),
    defaultValues: {
      name: "",
      address: "",
      pincode: "",
      city: "",
      state: "",
      email: "",
      password: "",
      phone: "",
      dob: "",
      salary: 0,
      work_status: "working",
      managerProfileImg: undefined,
    },
  });

  const { createManager, isLoading } = useCreateManagerMutation();

  const onSubmit = async (data: CreateManagerFormData) => {
    const formData = new FormData();

    formData.append("managerProfileImg", data.managerProfileImg);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("pincode", data.pincode);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("dob", data.dob);
    formData.append("salary", data.salary.toString());
    formData.append("work_status", data.work_status);

    await createManager(data);
    close(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Warehouse Image */}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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

        <FormField
          control={form.control}
          name="managerProfileImg"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Image
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
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
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
        {/*Date */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Date of Birth
              </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select your date of birth"
                  {...field}
                  className={fieldState.error ? "border-red-600" : ""}
                  onChange={(e) => {
                    const date = e.target.value;
                    field.onChange(date.toString()); // Convert date to string
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-600">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        {/* Salary */}
        <FormField
          control={form.control}
          name="salary"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-red-600" : ""}>
                Salary (in INR)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter salary"
                  type="number"
                  {...field}
                  className={fieldState.error ? "border-red-600" : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? "" : parseFloat(value)); // Convert to number or empty string
                  }}
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
          className={`w-full ${isLoading && "opacity-80"}`}
        >
          {isLoading ? (
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

export default CreateManagerForm;
