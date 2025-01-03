import Admin from "../models/admin.model.js";
import Manager from "../models/manager.model.js";
import Warehouse from "../models/warehouse.model.js";
import Order from "../models/order.model.js";
import Employee from "../models/employee.model.js";
import Vendor from "../models/vendor.model.js";
import Vehicle from "../models/vehicle.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { uploadImage } from "../config/cloudinary.js";

const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.adminId).select(
      "-password -_id -createdAt -updatedAt -__v",
    );

    if (!admin) {
      return res.status(404).json({
        message: "Admin doesn't exist. Please Sign-up",
      });
    }

    return res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

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

const signOutAdmin = async (req, res, next) => {
  try {
    res.clearCookie("admin_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Admin Signed Out successfully",
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

const updateManagerWorkStatus = async (req, res, next) => {
  try {
    let manager = await Manager.findOne({ email: req.body.email });
    let updatedStatus = req.body.work_status;
    if (!manager) {
      return res.status(400).json({
        message: "Manager under given email does not exist!!",
      });
    }

    if (
      Manager.schema.path("work_status").enumValues.indexOf(updatedStatus) ===
      -1
    ) {
      return res.status(400).json({
        message: "Invalid work status",
      });
    }
    manager = await Manager.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        work_status: updatedStatus,
      },
    );

    res.status(200).json({
      manager_id: manager._id,
      message: "Manager work status successfully",
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

    const profileImage = req.file;
    let profileImgDetails = null;

    if (profileImage) {
      profileImgDetails = await uploadImage(profileImage);
    }

    warehouse = await Warehouse.create(
      profileImgDetails
        ? {
            ...req.body,
            profile_img: {
              profile_img_url: profileImgDetails.secure_url,
              public_id: profileImgDetails.public_id,
            },
            state: req.body.state.toLowerCase(),
          }
        : { ...req.body, state: req.body.state.toLowerCase() },
    );

    return res.status(201).json({
      warehouse_id: warehouse._id,
      message: "Warehouse profile created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateWarehouseStatus = async (req, res, next) => {
  try {
    let warehouse = await Warehouse.findOne({ email: req.body.email });
    if (!warehouse) {
      return res.status(400).json({
        message: "Warehouse under given email does not exist!!",
      });
    }

    warehouse = await Warehouse.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        status: warehouse.status === "open" ? "close" : "open",
      },
    );

    res.status(200).json({
      warehouse_id: warehouse._id,
      message: "Warehouse status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getWarehouseList = async (_req, res, next) => {
  try {
    let warehouseList = await Warehouse.find({}).select("-password").populate({
      path: "manager_id",
      select: "-password -manager_id -__v -createdAt -updatedAt ",
    });

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
    const { state } = req.params;
    let stateWarehouse = await Warehouse.find({ state }).select(
      "-createdAt -updatedAt -__v -_id  -password",
    );

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

    vehicle = await Vehicle.create(
      vehicleImgDetails
        ? {
            ...req.body,
            vehicle_img: {
              vehicle_img_url: vehicleImgDetails.secure_url,
              public_id: vehicleImgDetails.public_id,
            },
          }
        : req.body,
    );

    res.status(201).json({
      vehicle_id: vehicle._id,
      message: "New vehicle added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicleStatus = async (req, res, next) => {
  try {
    let vehicle = await Vehicle.findOne({
      number_plate: req.body.number_plate,
    });
    let updatedStatus = req.body.status;
    if (!vehicle) {
      return res.status(400).json({
        message: "Vehicle does not exist!!",
      });
    }

    if (
      Vehicle.schema.path("curr_status").enumValues.indexOf(updatedStatus) ===
      -1
    ) {
      return res.status(400).json({
        message: "Invalid work status",
      });
    }
    vehicle = await Vehicle.findOneAndUpdate(
      {
        number_plate: req.body.number_plate,
      },
      {
        curr_status: updatedStatus,
      },
    );

    res.status(200).json({
      vehicle_id: vehicle._id,
      message: "Vehicle status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const [
      vendorsCount,
      warehousesCount,
      openWarehouseCount,
      managersCount,
      employeesCount,
      driversCount,
      deliveryBoysCount,
      ordersCount,
      vehiclesCount,
      availableVehicleCount,
      activeOrdersCount,
      deliveredOrderCount,
    ] = await Promise.all([
      Vendor.countDocuments(),
      Warehouse.countDocuments(),
      Warehouse.countDocuments({ status: "open" }),
      Manager.countDocuments({ work_status: "working" }),
      Employee.countDocuments({ curr_status: "employed" }),
      Employee.countDocuments({ role: "driver" }),
      Employee.countDocuments({ role: "delivery_boy" }),
      Order.countDocuments(),
      Vehicle.countDocuments(),
      Vehicle.countDocuments({ curr_status: "available" }),
      Order.countDocuments({
        status: {
          $nin: ["delivered", "cancelled"],
        },
      }),
      Order.countDocuments({ status: "delivered" }),
    ]);

    res.status(200).json({
      total_vendors: vendorsCount,
      total_warehouses: warehousesCount,
      warehouses_open: openWarehouseCount,
      warehouses_closed: warehousesCount - openWarehouseCount,
      total_working_managers: managersCount,
      total_working_employees: employeesCount,
      total_drivers: driversCount,
      total_delivery_boys: deliveryBoysCount,
      total_orders: ordersCount,
      total_vehicles: vehiclesCount,
      available_vehicles: availableVehicleCount,
      total_active_orders: activeOrdersCount,
      total_delivered_orders: deliveredOrderCount,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAdmin,
  signInAdmin,
  signOutAdmin,
  createManagerProfile,
  createWarehouseProfile,
  getWarehouseList,
  getWarehousebyState,
  addVehicle,
  getStats,
  updateManagerWorkStatus,
  updateWarehouseStatus,
  updateVehicleStatus,
};
