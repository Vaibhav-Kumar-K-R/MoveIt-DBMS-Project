import { z } from "zod";
import { AddressDetailsType, WorkDetailsType } from "../../add-employee/types";

export const personalDetailsSchema = z.object({
  profile_img: z.instanceof(File).optional(),
  name: z.string().min(3).max(50),
  email: z.string().email(),
  dob: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/), // YYYY-MM-DD
  phone: z.string().regex(/^\d{10}$/),
});

export type PersonalDetailsType = z.infer<typeof personalDetailsSchema>;

export type EditEmployeeFormType = PersonalDetailsType &
  AddressDetailsType &
  WorkDetailsType;
