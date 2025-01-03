import { useForm } from "react-hook-form";
import { CustomerFormType, customerSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Building2, Mail, MapIcon, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";

type CustomerDetailsFormProps = {
  orderData: CustomerFormType;
  updateOrderData: (data: CustomerFormType) => void;
};

const CustomerDetailsForm = ({
  orderData,
  updateOrderData,
}: CustomerDetailsFormProps) => {
  const form = useForm<CustomerFormType>({
    resolver: zodResolver(customerSchema),
    defaultValues: orderData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: CustomerFormType) => {
    updateOrderData(data);

    if (!isLastStep) return next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
      >
        <h1 className="text-xl font-bold mb-2">Customer Details</h1>

        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_name ? "text-red-400" : ""
                  }
                >
                  Customer Name *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <User className="mr-2 text-gray-500" />
                    <Input
                      className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                      placeholder="John Doe"
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Please enter customer name</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_email ? "text-red-400" : ""
                  }
                >
                  Customer Email *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Mail className="mr-2 text-gray-500" />
                    <Input
                      className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                      placeholder="johndoe@example.com"
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Please enter customer email</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_phone ? "text-red-400" : ""
                  }
                >
                  Customer Phone *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <div className="flex items-center mr-2 py-[0.38rem] rounded-l-md text-sm select-none font-semibold">
                      <img
                        className="mr-2 h-4"
                        src="/images/indian-flag.png"
                        draggable={false}
                      />
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder="12345 67890"
                      {...field}
                      className="flex-1 text-sm placeholder:text-muted-foreground border rounded-r-md focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Please enter customer phone number
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_city ? "text-red-400" : ""
                  }
                >
                  Customer City *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Building2 className="mr-2 text-gray-500" />
                    <Input
                      className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                      placeholder="e.g. Mysore"
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Please enter customer City</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_state"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_state ? "text-red-400" : ""
                  }
                >
                  Customer State *
                </FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <MapIcon className="mr-2 text-gray-500" />
                    <Input
                      className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                      placeholder="e.g. Karnataka"
                      type="text"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Please enter customer City</FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={
                    form.formState.errors.customer_address ? "text-red-400" : ""
                  }
                >
                  Customer Full Address *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="123, ABC Street, XYZ City"
                    className="placeholder:text-sm placeholder:text-muted-foreground h-28 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter customer full address
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <MultiStepFormButtons {...controls} />
        </div>
      </form>
    </Form>
  );
};

export default CustomerDetailsForm;
