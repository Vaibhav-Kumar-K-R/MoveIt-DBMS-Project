import express from "express";
import warehousesController from "../controllers/warehouses.controller.js";
import warehouseValidateMiddleware from "../middlewares/warehouse-validate.middleware.js";

const warehouseRouter = express.Router();

warehouseRouter.post(
  "/auth/sign-in",
  warehouseValidateMiddleware.validateWarehouseSignInRequest,
  warehousesController.signInWarehouse,
);

warehouseRouter.post(
  "/add-order-stop/:shippingId/:warehouseId",
  warehousesController.addOrderStop,
);

export default warehouseRouter;
