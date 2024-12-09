import { z } from "zod";

const validateAdminSignInRequest = (req, res, next) => {
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

const validateCreateWarehouseRequest = (req, res, next) => {
  try {
    const warehouseSchema = z.object({
      name: z.string().min(3).max(50),
      address: z.string().min(3).max(100),
      pincode: z.string().min(6).max(6),
      city: z.string(),
      state: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(50),
    });

    warehouseSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateCreateManagerRequest = (req, res, next) => {
  try {
    const managerSchema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      phone: z.string().min(10).max(10),
      dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // DD-MM-YYYY
      password: z.string().min(8).max(50),
    });

    managerSchema.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

export default {
  validateAdminSignInRequest,
  validateCreateWarehouseRequest,
  validateCreateManagerRequest,
};
