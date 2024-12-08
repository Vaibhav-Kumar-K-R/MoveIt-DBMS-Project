import Vendor from "../models/vendor.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signUpVendor = async (req, res, next) => {
  try {
    let vendor = await Vendor.findOne({ email: req.body.email });

    if (vendor) {
      return res.status(400).json({
        message: "Vendor already exists",
      });
    }

    vendor = await Vendor.create(req.body);

    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("vendor_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      vendor,
      message: "Vendor Registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signInVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor doesn't exist. Please Sign-up",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, vendor.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign({ vendorId: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("vendor_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      vendor,
      message: "Vendor Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signUpVendor,
  signInVendor,
};
