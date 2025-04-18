import Manager from "../models/manager.model.js";
import Employee from "../models/employee.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadImage } from "../config/cloudinary.js";

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

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page.toString() || "1");
    const skip = (pageNumber - 1) * pageSize;

    const employees = await Employee.find({
      manager: managerId,
    })
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);
    const totalEmployees = await Employee.countDocuments({
      manager: managerId,
    });

    res.status(200).json({
      employees,
      pagination: {
        total: totalEmployees,
        page: pageNumber,
        pages: Math.ceil(totalEmployees / pageSize),
      },
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
      secure:true,
      sameSite: "None",
    
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
    res.clearCookie("manager_auth_token",{
      httpOnly: true,
      secure:true,
      sameSite:"None",
      path:"/ "
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

const updateEmoployee = async (req, res, next) => {
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
        message: "You are not authorized to update this employee",
      });
    }

    const profileImg = req.file;
    let profileImgDetails = null;

    if (profileImg) {
      profileImgDetails = await uploadImage(profileImg);
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      profileImgDetails
        ? {
            ...req.body,
            profile_img: {
              profile_img_url: profileImgDetails.secure_url,
              public_id: profileImgDetails.public_id,
            },
          }
        : req.body,
      { new: true }
    );

    res.status(200).json({
      employee_id: updatedEmployee._id,
      message: "Employee updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployeeWorkStatus = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.query;
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

    const workStatuses = ["employed", "resigned", "terminated"];

    if (!workStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid work status",
      });
    }

    switch (status) {
      case "employed":
        await Employee.findByIdAndUpdate(employeeId, {
          work_status: "employed",
        });
        break;

      case "resigned":
        await Employee.findByIdAndUpdate(employeeId, {
          work_status: "resigned",
          curr_status: "inactive",
        });
        break;

      case "terminated":
        await Employee.findByIdAndUpdate(employeeId, {
          work_status: "terminated",
          curr_status: "inactive",
        });
        break;
    }

    res.status(200).json({
      employee_id: employeeId,
      message: "Employee work status updated successfully",
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
  updateEmoployee,
  updateEmployeeWorkStatus,
};
