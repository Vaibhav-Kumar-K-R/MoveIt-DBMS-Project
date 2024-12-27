import { useForm } from "react-hook-form";
import { ShopDetailsData, shopDetailsSchema } from "../types";
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
import { Textarea } from "@/components/ui/textarea";
import { Store } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";

type ShopDetailsSectionProps = {
  updateSignUpData: (data: ShopDetailsData) => void;
  signUpData: ShopDetailsData;
};

const ShopDetailsSection = ({
  updateSignUpData,
  signUpData,
}: ShopDetailsSectionProps) => {
  const form = useForm<ShopDetailsData>({
    resolver: zodResolver(shopDetailsSchema),
    defaultValues: signUpData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: ShopDetailsData) => {
    updateSignUpData(data);
    if (!isLastStep) return next();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <h1 className="text-xl font-bold mb-2">Shop Details</h1>

          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="shop_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name *</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md px-3 py-2">
                      <Store className="mr-2 text-gray-500" />
                      <Input
                        placeholder="Shop Name"
                        {...field}
                        className="text-sm placeholder:text-muted-foreground"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Please enter your shop name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shop_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Description *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a brief description about your shop"
                      className="resize-none h-[140px] text-sm placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please write a brief description about your shop
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

export default ShopDetailsSection;
