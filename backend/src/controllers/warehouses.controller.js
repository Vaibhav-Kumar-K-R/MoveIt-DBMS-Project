import Warehouse from "../models/warehouse.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Tracking from "../models/tracking.model.js";
import Vehicle from "../models/vehicle.model.js";
import Employee from "../models/employee.model.js";
import mongoose from "mongoose";
import Order from "../models/order.model.js";

const getWarehouse = async (req, res, next) => {
  try {
    const warehouse = await Warehouse.findById(req.warehouseId).select(
      "-password -__v",
    );

    if (!warehouse) {
      return res.status(404).json({
        message: "Warehouse doesn't exist",
      });
    }

    res.status(200).json(warehouse);
  } catch (error) {
    next(error);
  }
};

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
      { expiresIn: "1d" },
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

const signOutWarehouse = async (req, res, next) => {
  try {
    res.clearCookie("warehouse_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const departureTracking = async (req, res, next) => {
  try {
    const { shippingId } = req.params;
    const { vehicleId, employeeId } = req.body;

    const order = await Order.findOne({ shipping_id: shippingId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const invalidStatuses = ["cancelled", "delivered", "out_for_delivery"];
    if (invalidStatuses.includes(order.status)) {
      return res.status(400).json({ message: `Order already ${order.status}` });
    }

    const latestTracking = await Tracking.findOne({
      order: order._id,
      warehouse: req.warehouseId,
    }).sort({ createdAt: -1 });

    if (
      !latestTracking ||
      latestTracking.warehouse != req.warehouseId ||
      latestTracking.status !== "arrived"
    ) {
      return res.status(400).json({
        message: "Order not yet arrived",
      });
    }

    if (!latestTracking.isVerified) {
      return res.status(400).json({
        message: "Previous Tracking not yet verified",
      });
    }

    const existingDeparture = await Tracking.findOne({
      order: order._id,
      warehouse: req.warehouseId,
      status: "departed",
    });

    if (existingDeparture) {
      return res.status(400).json({ message: "Order already departed" });
    }

    const [vehicle, employee] = await Promise.all([
      Vehicle.findById(vehicleId),
      Employee.findById(employeeId),
    ]);

    if (!vehicle || !employee) {
      return res.status(404).json({
        message: !vehicle ? "Vehicle not found" : "Driver not found",
      });
    }

    if (employee.role !== "driver") {
      return res.status(400).json({ message: "Employee is not a driver" });
    }

    await Tracking.create({
      order: order._id,
      warehouse: req.warehouseId,
      employee: employeeId,
      vehicle: vehicleId,
      status: "departed",
      isVerified: true,
    });

    res.status(200).json({ message: "Departure recorded successfully" });
  } catch (error) {
    next(error);
  }
};

const outForDeliveryOrder = async (req, res, next) => {
  try {
    const { shippingId } = req.params;

    const order = await Order.findOne({ shipping_id: shippingId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const invalidStatuses = ["cancelled", "delivered"];
    if (invalidStatuses.includes(order.status)) {
      return res.status(400).json({
        message: `Order already ${order.status}`,
      });
    }

    const latestTracking = await Tracking.findOne({
      order: order._id,
      warehouse: req.warehouseId,
    }).sort({ createdAt: -1 });

    if (
      !latestTracking ||
      latestTracking.warehouse != req.warehouseId ||
      latestTracking.status !== "arrived"
    ) {
      return res.status(400).json({
        message: "Order not yet departed",
      });
    }

    if (!latestTracking.isVerified) {
      return res.status(400).json({
        message: "Previous Tracking not yet verified",
      });
    }

    const existingOutForDelivery = await Tracking.findOne({
      order: order._id,
      warehouse: req.warehouseId,
      status: "out_for_delivery",
    });

    if (existingOutForDelivery) {
      return res.status(400).json({
        message: "Order already out for delivery",
      });
    }

    await Tracking.create({
      order: order._id,
      warehouse: req.warehouseId,
      status: "out_for_delivery",
      isVerified: true,
    });

    order.status = "out_for_delivery";
    await order.save();

    res.status(200).json({
      message: "Out for delivery recorded successfully",
    });
  } catch (error) {
    next(error);
  }
};
const verifyTracking = async (req, res, next) => {
  try {
    const { trackingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trackingId)) {
      return res.status(400).json({
        message: "Invalid tracking id",
      });
    }

    const tracking = await Tracking.findById(trackingId);

    if (!tracking) {
      return res.status(404).json({
        message: "Tracking not found",
      });
    }

    if (tracking.isVerified) {
      return res.status(400).json({
        message: "Tracking already verified",
      });
    }

    tracking.isVerified = true;
    await tracking.save();

    res.status(200).json({
      message: "Tracking verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTracking = async (req, res, next) => {
  try {
    const { trackingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(trackingId)) {
      return res.status(400).json({
        message: "Invalid tracking id",
      });
    }

    // Can delete the order stop only if it is not verified
    const tracking = await Tracking.findById(trackingId);

    if (!tracking) {
      return res.status(404).json({
        message: "Tracking not found",
      });
    }

    if (tracking.isVerified) {
      return res.status(400).json({
        message: "Tracking already verified and cannot be deleted",
      });
    }

    await tracking.deleteOne();

    res.status(200).json({
      message: "Tracking deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getWarehouse,
  signInWarehouse,
  signOutWarehouse,
  departureTracking,
  outForDeliveryOrder,
  verifyTracking,
  deleteTracking,
};
