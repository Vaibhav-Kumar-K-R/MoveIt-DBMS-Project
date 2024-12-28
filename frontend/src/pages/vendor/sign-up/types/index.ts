import { z } from "zod";

export const personalDetailsSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .regex(/^\d{10}$/, "Enter a valid Indian phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;

export const shopDetailsSchema = z.object({
  shop_name: z.string().min(1, "Shop name is required"),
  shop_description: z
    .string()
    .min(1, "Shop description is required")
    .max(250, "Shop description must be at most 250 characters"),
});

export type ShopDetailsData = z.infer<typeof shopDetailsSchema>;

export const addressDetailsSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(3, "State is required"),
  pin_code: z.string().length(6, "Pin code must be 6 digits"),
});

export type AddressDetailsData = z.infer<typeof addressDetailsSchema>;

export type VendorsSignUpData = PersonalDetailsData &
  ShopDetailsData &
  AddressDetailsData;
