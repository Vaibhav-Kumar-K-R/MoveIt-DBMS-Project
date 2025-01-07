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
          { message: "Invalid Indian Licence Number" }
        ),
      email: z.string().email(),
      password: z.string().min(8).max(50),
      phone: z.string().regex(/^\d{10}$/),
      address: z.string().min(3).max(100),
      pincode: z.string().min(6).max(6),
      city: z.string().min(3).max(50),
      state: z.string().min(3).max(50),
      dob: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/), // YYYY-MM-DD
      role: z.enum(["driver", "delivery_boy"]),
      driving_experience: z.coerce.number().min(1),
      salary: z.coerce.number().min(1),
    });

    addEmployeeSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateUpdateEmployeeRequest = (req, res, next) => {
  try {
    const updateEmployeeSchema = z.object({
      name: z.string().min(3).max(50),
      licence_number: z
        .string()
        .regex(
          /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/,
          { message: "Invalid Indian Licence Number" }
        ),
      email: z.string().email(),
      phone: z.string().regex(/^\d{10}$/),
      address: z.string().min(3).max(100),
      pincode: z.string().min(6).max(6),
      city: z.string().min(3).max(50),
      state: z.string().min(3).max(50),
      dob: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/), // YYYY-MM-DD
      role: z.enum(["driver", "delivery_boy"]),
      driving_experience: z.coerce.number().min(1),
      salary: z.coerce.number().min(1),
    });

    updateEmployeeSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateManagerSignInRequest,
  validateAddEmployeeRequest,
  validateUpdateEmployeeRequest,
};
