import { z } from "zod";

export const trackingFormSchema = z.object({
  trackingId: z
    .string()
    .min(10, { message: "Tracking ID must be at least 10 characters" })
    .nonempty("Tracking ID is required")
    .startsWith("TRACKING_", {
      message: "Tracking ID must start with 'TRACKING_'",
    }),
});

export type TrackingFormType = z.infer<typeof trackingFormSchema>;
