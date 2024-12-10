import Admin from "../models/admin.model.js";
import Manager from "../models/manager.model.js";
import Warehouse from "../models/warehouse.model.js";
import Order from "../models/order.model.js";
import Employee from "../models/employee.model.js";
import Vendor from "../models/vendor.model.js";
import Vehicle from "../models/vehicle.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { uploadImage } from "../config/cloudinary.js";

const signInAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        message: "Admin doesn't exist. Please Sign-up",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("admin_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      adminId: admin._id,
      message: "Admin Signed In successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createManagerProfile = async (req, res, next) => {
  try {
    let manager = await Manager.findOne({ email: req.body.email });

    if (manager) {
      return res.status(400).json({
        message: "Manager already exists",
      });
    }

    const profileImage = req.file;
    let profileImgDetails = null;

    if (profileImage) {
      profileImgDetails = await uploadImage(profileImage);
    }

    manager = await Manager.create(
      profileImgDetails
        ? {
            ...req.body,
            profile_img: {
              profile_img_url: profileImgDetails.secure_url,
              public_id: profileImgDetails.public_id,
            },
          }
        : req.body,
    );

    res.status(201).json({
      manager_id: manager._id,
      message: "Manager profile created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createWarehouseProfile = async (req, res, next) => {
  try {
    let warehouse = await Warehouse.findOne({ email: req.body.email });

    if (warehouse) {
      return res.status(400).json({
        message: "Warehouse with given email already exists!!",
      });
    }
    // Validate that the manager_id exists as an ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.body.manager_id)) {
      return res.status(400).json({ error: "Invalid ObjectId for manager_id" });
    }
    req.body.manager_id = new mongoose.Types.ObjectId(req.body.manager_id);
    warehouse = await Warehouse.create(req.body);

    return res.status(201).json({
      warehouse_id: warehouse._id,
      message: "Warehouse profile created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getWarehouseList = async (req, res, next) => {
  try {
    let warehouseList = await Warehouse.find({}).select(
      "-createdAt -updatedAt -__v -_id",
    );

    if (warehouseList.length == 0) {
      return res.status(400).json({
        message: "No warehouses found !!",
      });
    }

    return res.status(201).json({
      warehouses: warehouseList,
      total_count: warehouseList.length,
    });
  } catch (error) {
    next(error);
  }
};

const getWarehousebyState = async (req, res, next) => {
  try {
    const state = req.params.state;
    let stateWarehouse = await Warehouse.find({
      state: state,
    }).select("-createdAt -updatedAt -__v -_id  -password");

    if (stateWarehouse.length == 0) {
      return res.status(400).json({
        message: "No warehouses found under the given state name!!",
      });
    }

    return res.status(201).json({
      warehouses: stateWarehouse,
      total_count: stateWarehouse.length,
    });
  } catch (error) {
    next(error);
  }
};

const addVehicle = async (req, res, next) => {
  try {
    let vehicle = await Vehicle.findOne({
      number_plate: req.body.number_plate,
    });

    if (vehicle) {
      return res.status(400).json({
        message: "Vehicle already exists",
      });
    }

    const vehicleImage = req.file;
    let vehicleImgDetails = null;

    if (vehicleImage) {
      vehicleImgDetails = await uploadImage(vehicleImage);
    }
    req.body.vehicle_img_url = vehicleImgDetails.secure_url;
    vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      vehicle_id: vehicle._id,
      message: "New vehicle added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [
      vendorCount,
      warehouseCount,
      managerCount,
      employeesCount,
      orderCount,
      vehiclesCount,
      activeordersCount,
    ] = await Promise.all([
      Vendor.countDocuments(),
      Warehouse.countDocuments(),
      Manager.countDocuments(),
      Employee.countDocuments(),
      Order.countDocuments(),
      Vehicle.countDocuments(),
      Order.countDocuments({ status: { $ne: "available" } }),
    ]);

    res.status(200).json({
      total_vendors: vendorCount,
      total_warehouses: warehouseCount,
      total_managers: managerCount,
      total_employees: employeesCount,
      total_orders: orderCount,
      total_vehicles: vehiclesCount,
      total_active_orders: activeordersCount,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch statistics!!",
    });
  }
};

const deleteManager = async (req, res, next) => {
  try {
    const managerName = req.params.managerName;
    let manager = await Manager.findOneAndDelete({
      name: managerName,
    });

    if (!manager) {
      return res.status(400).json({
        message: "Manager under the given name does not exist!!",
      });
    }

    return res.status(200).json({
      message: "Manager successfully removed",
    });
  } catch (error) {
    next(error);
  }
};

const deleteWarehouse = async (req, res, next) => {
  try {
    const warehouseName = req.params.warehouseName;
    let warehouse = await Warehouse.findOneAndDelete({
      name: warehouseName,
    });

    if (!warehouse) {
      return res.status(400).json({
        message: "Warehouse under the given name does not exist!!",
      });
    }

    return res.status(200).json({
      message: "Warehouse successfully removed",
    });
  } catch (error) {
    next(error);
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const numberPlate = req.params.number_plate;
    let vehicle = await Vehicle.findOneAndDelete({
      number_plate: numberPlate,
    });

    if (!vehicle) {
      return res.status(400).json({
        message: "Vehicle under the given number plate does not exist!!",
      });
    }

    return res.status(200).json({
      message: "Vehicle successfully removed",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signInAdmin,
  createManagerProfile,
  createWarehouseProfile,
  getWarehouseList,
  getWarehousebyState,
  addVehicle,
  getStats,
  deleteManager,
  deleteWarehouse,
  deleteVehicle,
};
