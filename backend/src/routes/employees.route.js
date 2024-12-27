import express from "express";
import employeesController from "../controllers/employees.controller.js";
import employeeAuthMiddleware from "../middlewares/employee-auth.middleware.js";

const employeeRouter = express.Router();

employeeRouter.post("/auth/sign-in", employeesController.signInEmployee);

employeeRouter.use(employeeAuthMiddleware.verifyEmployeeToken);

employeeRouter.get("/me", employeesController.getEmployee);

employeeRouter.post(
  "/add-order-stop/:shippingId/:warehouseId",
  employeeAuthMiddleware.verifyDriver,
  employeesController.addOrderStop
);

export default employeeRouter;
