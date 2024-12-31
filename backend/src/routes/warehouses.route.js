import express from "express";
import warehousesController from "../controllers/warehouses.controller.js";
import warehouseValidateMiddleware from "../middlewares/warehouse-validate.middleware.js";
import warehouseAuthMiddleware from "../middlewares/warehouse-auth.middleware.js";

const warehouseRouter = express.Router();

warehouseRouter.post(
  "/auth/sign-in",
  warehouseValidateMiddleware.validateWarehouseSignInRequest,
  warehousesController.signInWarehouse,
);

warehouseRouter.use(warehouseAuthMiddleware.verifyWarehouseToken);

warehouseRouter.get("/me", warehousesController.getWarehouse);

warehouseRouter.post("/auth/sign-out", warehousesController.signOutWarehouse);

warehouseRouter.post(
  "/departure/:shippingId",
  warehouseValidateMiddleware.validateOrderDepartureRequest,
  warehousesController.departureTracking,
);

warehouseRouter.post(
  "/out-for-delivery/:shippingId",
  warehousesController.outForDeliveryOrder,
);

warehouseRouter.patch(
  "/verify/:trackingId",
  warehousesController.verifyTracking,
);

warehouseRouter.delete(
  "/delete/:trackingId",
  warehousesController.deleteTracking,
);

export default warehouseRouter;
