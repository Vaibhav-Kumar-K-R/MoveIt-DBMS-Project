import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

const verifyEmployeeToken = (req, res, next) => {
  const token = req.cookies["employee_auth_token"];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.employeeId = decoded.employeeId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const verifyDriver = async (req, res, next) => {
  try {
    const employeeId = req.employeeId;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee doesn't exist. Please Sign-up",
      });
    }

    if (employee.role !== "driver") {
      return res.status(401).json({
        message: "You are not authorized to access this route",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const verifyDeliveryBoy = async (req, res, next) => {
  try {
    const employeeId = req.employeeId;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        message: "Employee doesn't exist. Please Sign-up",
      });
    }

    if (employee.role !== "delivery_boy") {
      return res.status(401).json({
        message: "You are not authorized to access this route",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Something went wrong",
    });
  }
};

export default {
  verifyEmployeeToken,
  verifyDriver,
  verifyDeliveryBoy,
};
