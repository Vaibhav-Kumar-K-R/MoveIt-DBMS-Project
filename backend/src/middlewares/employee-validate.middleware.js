import { z } from "zod";

const validateEmployeeSignInRequest = (req, res, next) => {
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

export default {
  validateEmployeeSignInRequest,
};
