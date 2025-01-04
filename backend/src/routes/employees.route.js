import express from "express";
import employeesController from "../controllers/employees.controller.js";
import employeeAuthMiddleware from "../middlewares/employee-auth.middleware.js";

const employeeRouter = express.Router();

employeeRouter.post("/auth/sign-in", employeesController.signInEmployee);

employeeRouter.use(employeeAuthMiddleware.verifyEmployeeToken);

employeeRouter.get("/me", employeesController.getEmployee);

employeeRouter.get("/all-warehouses", employeesController.getAllWarehouses);

employeeRouter.post("/auth/sign-out", employeesController.signOutEmployee);

employeeRouter.post(
  "/add-tracking",
  employeeAuthMiddleware.verifyDriver,
  employeesController.addTracking,
);

employeeRouter.post(
  "/delivery/:shippingId",
  employeeAuthMiddleware.verifyDeliveryBoy,
  employeesController.orderDelivery,
);

export default employeeRouter;
