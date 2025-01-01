import { z } from "zod";
export default interface WarehouseType {
  _id: string;
  name: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  status: string;
  manager_id: {
    profile_img: {
      profile_img_url: string;
    };
    name: string;
    profile_img_url: string;
    phone: string;
  };
}

export const createWarehouseFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  address: z
    .string()
    .nonempty("Address is required")
    .min(3, "Address must be at least 3 characters")
    .max(100, "Address cannot exceed 100 characters"),
  pincode: z
    .string()
    .nonempty("Pincode is required")
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits"),
  city: z.string().nonempty("City is required"),
  state: z.string().nonempty("State is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password cannot exceed 50 characters"),
  phone: z
    .string()
    .nonempty("Phone is required")
    .min(10, "Phone must be exactly 10 digits")
    .max(10, "Phone must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone must contain only digits"),
  status: z.enum(["open", "closed"]).default("open"),
  manager_id: z
    .string()
    .nonempty("Manager ID is required")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Object Id"),
});

export type createWarehouseFormData = z.infer<typeof createWarehouseFormSchema>;
