import mongoose from "mongoose";
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
      phone: z
        .string()
        .min(10)
        .max(10)
        .regex(/^\d{10}$/),
      status: z.enum(["open", "closed"]).default("open"),
      manager: z.string().refine((id) => mongoose.isValidObjectId(id), {
        message: "Invalid Object Id",
      }),
    });

    createWarehouseRequest.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateCreateManagerRequest = (req, res, next) => {
  try {
    parseInt(req.body.salary);
    const createManagerRequest = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(8).max(50),
      phone: z.string().min(10).max(10),
      address: z.string().min(3).max(100),
      pincode: z.string().min(6).max(6),
      city: z.string(),
      state: z.string(),
      dob: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/), // YYYY-MM-DD
      work_status: z
        .enum(["working", "resigned", "terminated"])
        .default("working"),
    });

    createManagerRequest.parse(req.body);

    next();
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error.message });
  }
};

const validateCreateVehicleRequest = (req, res, next) => {
  try {
    req.body.capacity = parseInt(req.body.capacity);
    const createVehicleRequest = z.object({
      number_plate: z
        .string()
        .regex(
          /^[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4}$/,
          "Invalid number plate format",
        ),
      curr_status: z.string(),
      capacity: z.number(),
      model: z.string(),
      type: z.string(),
    });

    createVehicleRequest.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateAdminSignInRequest,
  validateCreateWarehouseRequest,
  validateCreateManagerRequest,
  validateCreateVehicleRequest,
};
