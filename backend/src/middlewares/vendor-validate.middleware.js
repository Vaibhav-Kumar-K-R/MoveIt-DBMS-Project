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
      pincode: z.string().min(6).max(6),
    });

    signUpSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateVendorSignInRequest = (req, res, next) => {
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
      product_name: z.string().min(3, "Product name is required"),
      product_description: z
        .string()
        .min(3, "Product description is required")
        .max(250, "Product description must be at most 250 characters"),
      quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
      product_img_url: z.string().url("Invalid URL"),
      price_details: z.object({
        product_price: z.coerce.number().min(1, "Product price is required"),
        delivery_charge: z.coerce
          .number()
          .min(1, "Delivery charge is required"),
        gst: z.coerce.number().min(0).max(1, "GST must be between 0 and 1"),
      }),
      weight: z.coerce.number().gt(0, "Weight is required"),
      customer_name: z.string().min(3, "Customer name is required"),
      customer_email: z.string().email("Invalid email address"),
      customer_city: z.string().min(3, "City is required"),
      customer_state: z.string().min(3, "State is required"),
      customer_phone: z
        .string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits")
        .regex(/^\d{10}$/, "Invalid phone number"),
      customer_address: z.string().min(3, "Address is required"),
      order_placed_date: z.coerce.date(),
    });

    createOrderSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const validateUpdateProfileRequest = (req, res, next) => {
  try {
    const updateProfileSchema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      phone: z.string().min(10).max(10),
      address: z.string().min(3).max(100),
      city: z.string().min(3).max(50),
      state: z.string().min(3).max(50),
      shop_name: z.string().min(3).max(50),
      shop_description: z.string().min(3).max(250),
      pincode: z.string().min(6).max(6),
    });

    updateProfileSchema.parse(req.body);

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  validateVendorSignUpRequest,
  validateVendorSignInRequest,
  validateCreateOrderRequest,
  validateUpdateProfileRequest,
};
