import Warehouse from "../models/warehouse.model.js";
import Order from "../models/order.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OrderStop from "../models/order-stop.model.js";
import Vehicle from "../models/vehicle.model.js";
import Employee from "../models/employee.model.js";

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

const departureOrderStop = async (req, res, next) => {
  try {
    const { orderStopId } = req.params;
    const { vehicleId, driverId } = req.body;

    const orderStop = await OrderStop.findById(orderStopId);

    if (!orderStop) {
      return res.status(404).json({
        message: "Order stop not found",
      });
    }

    const [vehicle, employee] = await Promise.all([
      Vehicle.findById(vehicleId),
      Employee.findById(driverId),
    ]);

    if (!vehicle || !employee) {
      return res.status(404).json({
        message: !vehicle ? "Vehicle not found" : "Driver not found",
      });
    }

    if (employee.role !== "driver") {
      return res.status(400).json({
        message: "Employee is not a driver",
      });
    }

    orderStop.departure_datetime = Date.now();
    orderStop.vehicle_id = vehicleId;
    orderStop.driver_id = driverId;

    await orderStop.save();

    res.status(200).json({
      message: "Order stop departed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signInWarehouse,
  addOrderStop,
  departureOrderStop,
};
