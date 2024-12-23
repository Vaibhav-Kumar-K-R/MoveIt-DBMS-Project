import express from "express";
import employeesController from "../controllers/employees.controller";

const employeeRouter = express.Router();

employeeRouter.post("/auth/sign-in", employeesController.signInEmployee);

employeeRouter.post(
  "/add-order-stop/:shippingId/:warehouseId",
  employeesController.addOrderStop,
);

export default employeeRouter;
