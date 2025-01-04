import { z } from "zod";

export const departTrackingFormSchema = z.object({
  shippingId: z
    .string()
    .min(10, "Shipping id is required")
    .startsWith("SHIPPING_"),
  employeeId: z
    .string({ message: "Employee is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
  vehicleId: z
    .string({ message: "Vehicle is required" })
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
});

export type DepartTrackingFormValues = z.infer<typeof departTrackingFormSchema>;
