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
    const createWarehouseRequest = z.object({
      name: z.string().min(3).max(50),
      address: z.string().min(3).max(100),
      pincode: z.string().min(6).max(6),
      city: z.string(),
      state: z.string(),
      email: z.string().email(),
      password: z.string().min(8).max(50),
      manager_id: z.string(),
    });

    createWarehouseRequest.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const validateCreateManagerRequest = (req, res, next) => {
  try {
    const createManagerRequest = z.object({
      name: z.string().min(3).max(50),
      profile_img_url: z.string(),
      phone: z.string().min(10).max(10),
      dob: z.string().min(8).max(10),
      email: z.string().email(),
      password: z.string().min(8).max(50),
    });

    createManagerRequest.parse(req.body);

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
