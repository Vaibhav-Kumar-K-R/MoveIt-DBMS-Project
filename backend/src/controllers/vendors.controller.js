import Vendor from "../models/vendor.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Order from "../models/order.model.js";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../config/cloudinary.js";

const getVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.vendorId).select("-password -__v");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    return res.status(200).json(vendor);
  } catch (error) {
    next(error);
  }
};

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
      vendorId: vendor._id,
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
      vendorId: vendor._id,
      message: "Vendor Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signOutVendor = async (req, res, next) => {
  try {
    res.clearCookie("vendor_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Vendor Signed Out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const vendorId = req.vendorId;
    const profileImage = req.file;
    let profileImgDetails = null;
    let updatedVendor;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    if (profileImage) {
      profileImgDetails = await uploadImage(
        profileImage,
        vendor.profile_img?.public_id
      );

      updatedVendor = await Vendor.findByIdAndUpdate(
        vendorId,
        {
          ...req.body,
          profile_img: {
            profile_img_url: profileImgDetails.secure_url,
            public_id: profileImgDetails.public_id,
          },
        },
        { new: true }
      );
    } else {
      updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
        new: true,
      });
    }

    res.status(200).json({
      vendorId,
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    // Generate a unique tracking ID and shipping ID using UUID
    const trackingId = `TRACKING_${uuidv4().split("-")[0]}`;
    const shippingId = `SHIPPING_${uuidv4().split("-")[0]}`;

    const { price_details } = req.body;

    const amount =
      Number(price_details.product_price) +
      Number(price_details.delivery_charge);
    const gstAmount = amount * Number(price_details.gst);

    price_details.total_price = (amount + gstAmount).toFixed(2);
    req.body.price_details = price_details;

    const order = await Order.create({
      ...req.body,
      tracking_id: trackingId,
      shipping_id: shippingId,
      vendor_id: req.vendorId,
      status: "placed",
    });

    return res.status(201).json({
      orderId: order._id,
      message: "Order created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { shippingId } = req.params;
    const order = await Order.findOne({ shipping_id: shippingId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const invalidStatuses = ["cancelled", "delivered", "out_for_delivery"];
    if (invalidStatuses.includes(order.status)) {
      return res.status(400).json({
        message: `Order already ${order.status}`,
      });
    }

    order.status = "cancelled";
    order.order_cancelled_date = new Date();

    await order.save();

    return res.status(200).json({
      orderId: order._id,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getRecentOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ vendor_id: req.vendorId })
      .sort({ createdAt: "desc" })
      .limit(5)
      .select("-__v");

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getVendor,
  signUpVendor,
  signInVendor,
  signOutVendor,
  updateProfile,
  createOrder,
  cancelOrder,
  getRecentOrders,
};
