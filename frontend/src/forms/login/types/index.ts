import { z } from "zod";

// Zod schema for login form data
export const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

export type LoginFormData = z.infer<typeof formSchema>;
