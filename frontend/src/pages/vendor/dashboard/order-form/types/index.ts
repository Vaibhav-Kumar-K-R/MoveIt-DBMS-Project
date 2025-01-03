import { z } from "zod";

export const productSchema = z.object({
  product_name: z.string().min(3, "Product name is required"),
  product_description: z
    .string()
    .min(3, "Product description is required")
    .max(250, "Product description must be at most 250 characters"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  product_img_url: z.string().url("Invalid URL"),
  price_details: z.object({
    product_price: z.coerce.number().min(1, "Product price is required"),
    delivery_charge: z.coerce.number().min(1, "Delivery charge is required"),
    gst: z.coerce.number().min(0).max(1, "GST must be between 0 and 1"),
  }),
  weight: z.coerce.number().gt(0, "Weight is required"),
  order_placed_date: z.coerce.date(),
  warehouse: z
    .string()
    .nonempty("Warehouse is required, please select a Warehouse")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
});

export type ProductFormType = z.infer<typeof productSchema>;

export const customerSchema = z.object({
  customer_name: z.string().min(3, "Customer name is required"),
  customer_email: z.string().email("Invalid email address"),
  customer_phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^\d{10}$/, "Invalid phone number"),
  customer_city: z.string().min(3, "City is required"),
  customer_state: z.string().min(3, "State is required"),
  customer_address: z.string().min(3, "Address is required"),
});

export type CustomerFormType = z.infer<typeof customerSchema>;

export type OrderFormType = ProductFormType & CustomerFormType;
