import express from "express";
import warehousesController from "../controllers/warehouses.controller.js";
import warehouseValidateMiddleware from "../middlewares/warehouse-validate.middleware.js";

const warehouseRouter = express.Router();

warehouseRouter.post(
  "/auth/sign-in",
  warehouseValidateMiddleware.validateWarehouseSignInRequest,
  warehousesController.signInWarehouse
);

export default warehouseRouter;
