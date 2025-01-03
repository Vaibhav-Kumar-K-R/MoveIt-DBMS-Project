import { useForm } from "react-hook-form";
import { AddressDetailsData, addressDetailsSchema } from "../types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MapPinHouse, Pin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";

type AddressDetailsSectionProps = {
  updateSignUpData: (data: AddressDetailsData) => void;
  signUpData: AddressDetailsData;
};

const AddressDetailsSection = ({
  updateSignUpData,
  signUpData,
}: AddressDetailsSectionProps) => {
  const form = useForm<AddressDetailsData>({
    resolver: zodResolver(addressDetailsSchema),
    defaultValues: signUpData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: AddressDetailsData) => {
    updateSignUpData(data);
    if (!isLastStep) return next();
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
            <div className="flex md:flex-row flex-col items-start gap-3 w-full">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>State *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <MapPinHouse className="mr-2 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="Karnataka"
                          {...field}
                          className="w-full text-sm placeholder:text-muted-foreground"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Which state do you operate?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-3 py-2">
                        <MapPinHouse className="mr-2 text-gray-500" />
                        <Input
                          type="text"
                          placeholder="Mysuru"
                          {...field}
                          className="w-full text-sm placeholder:text-muted-foreground"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Which city do you operate?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Pin Code *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <Pin className="mr-2 text-gray-500" />
                      <Input
                        type="text"
                        placeholder="578 001"
                        {...field}
                        className="w-full text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter your pin code</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Main Street, Mysuru, Karnataka 578 001"
                      className="resize-none h-[90px] text-sm placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please enter your full address
                  </FormDescription>
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

export default AddressDetailsSection;
