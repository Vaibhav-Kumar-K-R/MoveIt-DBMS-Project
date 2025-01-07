import express from "express";
import employeesController from "../controllers/employees.controller.js";
import employeeAuthMiddleware from "../middlewares/employee-auth.middleware.js";

const employeeRouter = express.Router();

employeeRouter.post("/auth/sign-in", employeesController.signInEmployee);

employeeRouter.get(
  "/get-all-drivers",
  employeesController.getAllAvailableDrivers
);

employeeRouter.use(employeeAuthMiddleware.verifyEmployeeToken);

employeeRouter.get("/me", employeesController.getEmployee);

employeeRouter.post("/auth/sign-out", employeesController.signOutEmployee);

employeeRouter.post(
  "/add-tracking",
  employeeAuthMiddleware.verifyDriver,
  employeesController.addTracking
);

employeeRouter.post(
  "/delivery/:shippingId",
  employeeAuthMiddleware.verifyDeliveryBoy,
  employeesController.orderDelivery
);

export default employeeRouter;
