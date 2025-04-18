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
      "-password -__v"
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

const getAllWarehouses = async (_req, res, next) => {
  try {
    const warehouses = await Warehouse.find({}).select("-password -__v");

    res.status(200).json({
      warehouses,
    });
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
      { expiresIn: "1d" }
    );

    res.cookie("warehouse_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure:true,
      sameSite: "None",
     
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
      secure:true,
      sameSite:"None",
      path:"/ "
    });

    res.status(200).json({
      message: "Signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAssignedOrders = async (req, res, next) => {
  try {
    const pageSize = 5;
    const page = parseInt(req.query?.page?.toString() || "1");
    const skip = (page - 1) * pageSize;

    const query = {
      warehouse: req.warehouseId,
      warehouse_status: "pending",
    };

    const orders = await Order.find(query)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(pageSize)
      .select("-__v")
      .populate({
        path: "vendor",
        select: "-password -__v",
      });
    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      orders,
      pagination: {
        total: totalOrders,
        page,
        pages: Math.ceil(totalOrders / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAssignedTrackings = async (req, res, next) => {
  try {
    const pageSize = 5;
    const page = parseInt(req.query?.page?.toString() || "1");
    const skip = (page - 1) * pageSize;

    const query = {
      warehouse: req.warehouseId,
      isVerified: false,
    };

    const trackings = await Tracking.find(query)
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(pageSize)
      .select("-__v -warehouse")
      .populate({
        path: "order",
        select: "-__v",
        populate: {
          path: "vendor",
          select: "-password -__v",
        }
      })
      .populate({
        path: "vehicle",
        select: "number_plate capacity curr_status model type vehicle_img",
      })
      .populate({
        path: "employee",
        select:
          "profile_img name licence_number email phone city state dob role driving_experience curr_status",
      });
    const totalTrackings = await Tracking.countDocuments(query);

    res.status(200).json({
      trackings,
      pagination: {
        total: totalTrackings,
        page,
        pages: Math.ceil(totalTrackings / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderWarehouseStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.query;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.warehouse.toString() !== req.warehouseId) {
      return res.status(400).json({
        message: "You are not authorized to update this order",
      });
    }

    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    order.warehouse_status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const departureTracking = async (req, res, next) => {
  try {
    const { vehicleId, employeeId, shippingId } = req.body;

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

    employee.curr_status = "in_work";
    vehicle.curr_status = "in_use";
    await Promise.all([employee.save(), vehicle.save()]);

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
    const { shippingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shippingId)) {
      return res.status(400).json({
        message: "Invalid tracking id",
      });
    }

    const order = await Order.findOne({
      shipping_id: shippingId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "placed") {
      order.status = "in_transit";
      await order.save();
    }

    const tracking = await Tracking.findOne({
      shipping_id: shippingId,
    });

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
    const { shippingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shippingId)) {
      return res.status(400).json({
        message: "Invalid tracking id",
      });
    }

    // Can delete the order stop only if it is not verified
    const tracking = await Tracking.findOne({
      shipping_id: shippingId,
    });

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
  getAllWarehouses,
  signInWarehouse,
  signOutWarehouse,
  getAssignedOrders,
  getAssignedTrackings,
  updateOrderWarehouseStatus,
  departureTracking,
  outForDeliveryOrder,
  verifyTracking,
  deleteTracking,
};
