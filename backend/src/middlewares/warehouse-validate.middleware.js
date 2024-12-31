import mongoose from "mongoose";
import { z } from "zod";

const validateWarehouseSignInRequest = (req, res, next) => {
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

const validateOrderDepartureRequest = (req, res, next) => {
  try {
    const orderDepartureRequest = z.object({
      vehicleId: z.string().refine((id) => mongoose.isValidObjectId(id), {
        message: "Invalid ObjectId for vehicle",
      }),
      employeeId: z.string().refine((id) => mongoose.isValidObjectId(id), {
        message: "Invalid ObjectId for vehicle",
      }),
    });

    orderDepartureRequest.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateWarehouseSignInRequest,
  validateOrderDepartureRequest,
};
