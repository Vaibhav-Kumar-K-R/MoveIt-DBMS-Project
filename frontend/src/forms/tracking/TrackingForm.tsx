import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TrackingFormType, trackingFormSchema } from "./types";
import { useNavigate } from "react-router-dom";

const TrackingForm = () => {
  const form = useForm<TrackingFormType>({
    resolver: zodResolver(trackingFormSchema),
    defaultValues: {
      trackingId: "TRACKING_",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: TrackingFormType) => {
    navigate(`/tracking/${data.trackingId}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="trackingId"
          render={({ field }) => (
            <FormItem className="w-[60%]">
              <FormControl>
                <Input placeholder="Enter Tracking ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="px-6" type="submit">
          Track Order
        </Button>
      </form>
    </Form>
  );
};

export default TrackingForm;
