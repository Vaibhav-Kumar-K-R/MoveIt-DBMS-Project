import { z } from "zod";

export const personalDetailsSchema = z
  .object({
    profile_img: z.instanceof(File).optional(),
    name: z.string().min(3).max(50),
    email: z.string().email(),
    dob: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/), // YYYY-MM-DD
    phone: z.string().regex(/^\d{10}$/),
    password: z.string().min(8).max(50),
    confirm_password: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type PersonalDetailsType = z.infer<typeof personalDetailsSchema>;

export const addressDetailsSchema = z.object({
  city: z.string().min(3).max(50),
  state: z.string().min(3).max(50),
  pincode: z.string().min(6).max(6),
  address: z.string().min(3).max(100),
});

export type AddressDetailsType = z.infer<typeof addressDetailsSchema>;

export const workDetailsSchema = z.object({
  role: z.enum(["driver", "delivery_boy"]),
  licence_number: z
    .string()
    .regex(
      /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
      { message: "Invalid Indian Licence Number" }
    ),
  driving_experience: z.coerce.number().min(1),
  salary: z.coerce.number().min(1),
});

export type WorkDetailsType = z.infer<typeof workDetailsSchema>;

export type AddEmployeeFormType = PersonalDetailsType &
  AddressDetailsType &
  WorkDetailsType;
