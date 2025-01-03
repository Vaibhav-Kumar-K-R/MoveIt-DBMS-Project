import Manager from "../models/manager.model.js";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getManager = async (req, res, next) => {
  try {
    const manager = await Manager.findById(req.managerId).select(
      "-password -__v"
    );

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }

    return res.status(200).json(manager);
  } catch (error) {
    next(error);
  }
};

const getEmployeesUnderManager = async (req, res, next) => {
  try {
    const managerId = req.managerId;
    const manager = await Manager.findById(managerId);

    if (!manager) {
      return res.status(404).json({
        message: "Manager not found",
      });
    }

    const employees = await Employee.find({
      manager: managerId,
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      employees,
      message: "Employees fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signInManager = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(404).json({
        message: "Manager doesn't exist. Please Sign-up",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, manager.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }

    const token = jwt.sign({ managerId: manager._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("manager_auth_token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      managerId: manager._id,
      message: "Manager logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signOutManager = async (req, res, next) => {
  try {
    res.clearCookie("manager_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Manager logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const addEmployee = async (req, res, next) => {
  try {
    let employee = await Employee.findOne({ email: req.body.email });
    const profileImg = req.file;
    let profileImgDetails = null;

    if (employee) {
      return res.status(400).json({
        message: "Employee already exists",
      });
    }

    if (profileImg) {
      profileImgDetails = await uploadImage(profileImg);
    }

    employee = await Employee.create(
      profileImgDetails
        ? {
            ...req.body,
            manager: req.managerId,
            profile_img: {
              profile_img_url: profileImgDetails.secure_url,
              public_id: profileImgDetails.public_id,
            },
          }
        : {
            ...req.body,
            manager: req.managerId,
          }
    );

    res.status(201).json({
      employeeId: employee._id,
      message: "Employee added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const removeEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    if (employee.manager.toString() !== req.managerId) {
      return res.status(400).json({
        message: "You are not authorized to remove this employee",
      });
    }

    if (employee.profile_img?.public_id) {
      await deleteImage(employee.profile_img.public_id);
    }

    await Employee.findByIdAndDelete(employeeId);

    res.status(200).json({
      message: "Employee removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getManager,
  getEmployeesUnderManager,
  signInManager,
  signOutManager,
  addEmployee,
  removeEmployee,
};
