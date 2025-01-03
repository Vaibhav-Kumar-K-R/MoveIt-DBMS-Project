import Employee from "../models/employee.model.js";
import Order from "../models/order.model.js";
import Tracking from "../models/tracking.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.employeeId).select(
      "-password -__v",
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee doesn't exist. Please Sign-up",
      });
    }

    return res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};

const signInEmployee = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(404).json({
        message: "Employee doesn't exist. Please Sign-up",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, employee.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign(
      { employeeId: employee._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("employee_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      employeeId: employee._id,
      message: "Employee Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signOutEmployee = async (req, res, next) => {
  try {
    res.clearCookie("employee_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Employee Signed Out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const addTracking = async (req, res, next) => {
  try {
    const { shippingId, warehouseId } = req.params;
    const order = await Order.findOne({
      shipping_id: shippingId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    if (order.status === "delivered") {
      return res.status(400).json({
        message: "Order already delivered",
      });
    }

    if (order.status === "out_for_delivery") {
      return res.status(400).json({
        message: "Order already out for delivery",
      });
    }

    const latestTracking = await Tracking.findOne({
      order_id: order._id,
      warehouse_id: warehouseId,
    })
      .sort({ createdAt: -1 })
      .limit(1);

    if (latestTracking) {
      if (
        latestTracking.status === "arrived" &&
        latestTracking.employee_id !== req.employeeId
      ) {
        return res.status(400).json({
          message: "Order not yet departed",
        });
      }
    }

    let tracking = await Tracking.findOne({
      order_id: order._id,
      warehouse_id: warehouseId,
      status: "arrived",
    });

    if (tracking) {
      return res.status(400).json({
        message: "Tracking already notified",
      });
    }

    tracking = await Tracking.create({
      order_id: order._id,
      warehouse_id: warehouseId,
      status: "arrived",
      employee_id: req.employeeId,
    });

    res.status(201).json({
      orderStopId: tracking._id,
      message: "Order stop added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const orderDelivery = async (req, res, next) => {
  try {
    const { shippingId } = req.params;
    const order = await Order.findOne({
      shipping_id: shippingId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    if (order.status === "delivered") {
      return res.status(400).json({
        message: "Order already delivered",
      });
    }

    order.status = "delivered";
    order.order_delivered_date = new Date();

    await order.save();

    res.status(200).json({
      message: "Order delivered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getEmployee,
  signInEmployee,
  signOutEmployee,
  addTracking,
  orderDelivery,
};
