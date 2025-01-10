import express from "express";
import warehousesController from "../controllers/warehouses.controller.js";
import warehouseValidateMiddleware from "../middlewares/warehouse-validate.middleware.js";
import warehouseAuthMiddleware from "../middlewares/warehouse-auth.middleware.js";

const warehouseRouter = express.Router();

warehouseRouter.post(
  "/auth/sign-in",
  warehouseValidateMiddleware.validateWarehouseSignInRequest,
  warehousesController.signInWarehouse
);

warehouseRouter.get("/all-warehouses", warehousesController.getAllWarehouses);

warehouseRouter.use(warehouseAuthMiddleware.verifyWarehouseToken);

warehouseRouter.get("/me", warehousesController.getWarehouse);

warehouseRouter.post("/auth/sign-out", warehousesController.signOutWarehouse);

warehouseRouter.get(
  "/get-assigned-orders",
  warehousesController.getAssignedOrders
);

warehouseRouter.get(
  "/get-assigned-trackings",
  warehousesController.getAssignedTrackings
);

warehouseRouter.patch(
  "/update-order-status/:orderId",
  warehousesController.updateOrderWarehouseStatus
);

warehouseRouter.post(
  "/departure",
  warehouseValidateMiddleware.validateOrderDepartureRequest,
  warehousesController.departureTracking
);

warehouseRouter.post(
  "/out-for-delivery/:shippingId",
  warehousesController.outForDeliveryOrder
);

warehouseRouter.patch(
  "/verify/:shippingId",
  warehousesController.verifyTracking
);

warehouseRouter.delete(
  "/delete/:shippingId",
  warehousesController.deleteTracking
);

export default warehouseRouter;
