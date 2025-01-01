import { useForm } from "react-hook-form";
import { ProductFormType, productSchema } from "../types";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Link,
  Package,
  CalendarIcon,
  Tally5,
  IndianRupee,
  Wallet,
  Coins,
  Weight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/time-picker";
import { Calendar } from "@/components/ui/calendar";
import { MultiStepFormButtons } from "@/components/ui/multi-step-form";
import { useMultiStepFormContext } from "@/context/MultiStepFormContext";

type ProductFormProps = {
  orderData: ProductFormType;
  updateOrderData: (data: ProductFormType) => void;
};

const ProductForm = ({ orderData, updateOrderData }: ProductFormProps) => {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: orderData,
  });
  const { controls } = useMultiStepFormContext();
  const { isLastStep, next } = controls;

  const onSubmit = (data: ProductFormType) => {
    updateOrderData(data);

    if (!isLastStep) return next();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Product Name */}
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={
                  form.formState.errors.product_name ? "text-red-400" : ""
                }
              >
                Product Name *
              </FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Package className="mr-2 text-gray-500" />
                  <Input
                    className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                    placeholder="iPhone 14"
                    type="text"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter the Product Name</FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Product Description */}
        <FormField
          control={form.control}
          name="product_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={
                  form.formState.errors.product_description
                    ? "text-red-400"
                    : ""
                }
              >
                Product Description *
              </FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none h-28 placeholder:text-sm placeholder:text-muted-foreground"
                  placeholder="Description of the product..."
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the Product Description</FormDescription>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity *</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Tally5 className="mr-2 text-gray-500" />
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    className="placeholder:text-sm placeholder:text-muted-foreground"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Enter the quantity of the product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Product Image URL */}
        <FormField
          control={form.control}
          name="product_img_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image URL *</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Link className="mr-2 text-gray-500" />
                  <Input
                    className="placeholder:text-sm placeholder:text-muted-foreground w-full"
                    placeholder="https://example.com/image.jpg"
                    type="text"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter the Product Image URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price_details.product_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price *</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <IndianRupee className="mr-2 text-gray-500" />
                    <Input type="number" min={1} step={0.001} {...field} />
                  </div>
                </FormControl>
                <FormDescription>Enter the product price</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price_details.delivery_charge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Charge *</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Wallet className="mr-2 text-gray-500" />
                    <Input type="number" min={1} {...field} />
                  </div>
                </FormControl>
                <FormDescription>Enter the delivery charge</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price_details.gst"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GST (0 to 1) *</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <Coins className="mr-2 text-gray-500" />
                    <Input
                      type="number"
                      step={0.01}
                      min={0}
                      max={1}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter the GST as a decimal (e.g., 0.18)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Weight */}
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg) *</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <Weight className="mr-2 text-gray-500" />
                  <Input type="number" step={0.01} min={0.01} {...field} />
                </div>
              </FormControl>
              <FormDescription>Enter the weight of the product</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Order Placed Date */}
        <FormField
          control={form.control}
          name="order_placed_date"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Order Placed Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP | HH:mm:ss")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                  <div className="p-3 border-t-2 bg-slate-50">
                    <TimePicker date={field.value} setDate={field.onChange} />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>Select the Order Placed Date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <MultiStepFormButtons {...controls} />
      </form>
    </Form>
  );
};

export default ProductForm;
