import { z } from "zod";

export const addTrackingFormSchema = z.object({
  shippingId: z
    .string()
    .min(10, "Shipping id is required")
    .startsWith("SHIPPING_"),
  warehouse: z
    .string({ message: "Warehouse is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
  vehicle: z
    .string({ message: "Vehicle is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
});

export type AddTrackingFormValues = z.infer<typeof addTrackingFormSchema>;
