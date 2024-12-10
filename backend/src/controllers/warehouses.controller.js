import Warehouse from "../models/warehouse.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signInWarehouse = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const warehouse = await Warehouse.findOne({ email });

    if (!warehouse) {
      return res.status(404).json({
        message: "Warehouse doesn't exist. Please Sign-up",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, warehouse.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign(
      { warehouseId: warehouse._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("warehouse_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      warehouseId: warehouse._id,
      message: "Signed in successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Need to update
const addOrderStop = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export default {
  signInWarehouse,
  addOrderStop,
};
