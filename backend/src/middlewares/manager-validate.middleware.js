import { z } from "zod";

const validateManagerSignInRequest = (req, res, next) => {
  try {
    const signInSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(50),
    });

    signInSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateAddEmployeeRequest = (req, res, next) => {
  try {
    const addEmployeeSchema = z.object({
      name: z.string().min(3).max(50),
      licence_number: z
        .string()
        .regex(
          /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
          { message: "Invalid Indian Licence Number" },
        ),
      email: z.string().email(),
      password: z.string().min(8).max(50),
      phone: z.string().regex(/^\d{10}$/),
      dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // DD-MM-YYYY
      role: z.enum(["driver", "delivery_boy"]),
      driving_experience: z.coerce.number().min(1),
      salary: z.coerce.number().min(1),
      curr_status: z
        .enum(["in_work", "available", "on_leave", "inactive"])
        .default("available"),
      work_status: z
        .enum(["employed", "resigned", "terminated"])
        .default("employed"),
    });

    addEmployeeSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateManagerSignInRequest,
  validateAddEmployeeRequest,
};
