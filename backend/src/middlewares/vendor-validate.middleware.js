import { z } from "zod";

const validateVendorSignUpRequest = (req, res, next) => {
  try {
    const signUpSchema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      phone: z.string().min(10).max(10),
      address: z.string().min(3).max(100),
      city: z.string().min(3).max(50),
      state: z.string().min(3).max(50),
      password: z.string().min(8).max(50),
      shop_name: z.string().min(3).max(50),
      shop_description: z.string().min(3).max(250),
      pin_code: z.string().min(6).max(6),
    });

    signUpSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateSignInRequest = (req, res, next) => {
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

const validateCreateOrderRequest = (req, res, next) => {
  try {
    const createOrderSchema = z.object({
      product_name: z.string().min(3).max(50),
      product_description: z.string().min(3).max(250),
      quantity: z.coerce.number().min(1),
      product_img_url: z.string().url(),
      price: z.coerce.number().min(1),
      weight: z.coerce.number().gt(0),
      customer_name: z.string().min(3).max(50),
      customer_email: z.string().email(),
      customer_phone: z.string().min(10).max(10),
      customer_address: z.string().min(3).max(100),
      order_placed_date: z.coerce.date(),
      order_delivered_date: z.date().optional(),
      status: z.enum([
        "placed",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ]),
    });

    createOrderSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateVendorSignUpRequest,
  validateSignInRequest,
  validateCreateOrderRequest,
};
