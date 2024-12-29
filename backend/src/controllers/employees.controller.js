import Employee from "../models/employee.model.js";
import Order from "../models/order.model.js";
import OrderStop from "../models/order-stop.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.employeeId).select(
      "-password -__v"
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
      { expiresIn: "1d" }
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

const addOrderStop = async (req, res, next) => {
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

    let orderStop = await OrderStop.findOne({
      order_id: order._id,
      warehouse_id: warehouseId,
    });

    if (orderStop) {
      return res.status(400).json({
        message: "Order stop already added",
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

    orderStop = await OrderStop.create({
      order_id: order._id,
      warehouse_id: warehouseId,
      arrival_datetime: Date.now(),
    });

    res.status(201).json({
      orderStopId: orderStop._id,
      message: "Order stop added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getEmployee,
  signInEmployee,
  signOutEmployee,
  addOrderStop,
};
