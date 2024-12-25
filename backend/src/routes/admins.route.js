import express from "express";
import adminMiddlware from "../middlewares/admin-validate.middleware.js";
import adminController from "../controllers/admins.controller.js";
import upload from "../config/multer.js";
import adminAuthMiddleware from "../middlewares/admin-auth.middleware.js";

const adminRouter = express.Router();

adminRouter.post(
  "/sign-in",
  adminMiddlware.validateAdminSignInRequest,
  adminController.signInAdmin,
);

adminRouter.use(adminAuthMiddleware.verifyAdminToken);

adminRouter.get("/me", adminController.getAdmin);

adminRouter.post(
  "/create-manager",
  upload.single("managerProfileImg"),
  adminMiddlware.validateCreateManagerRequest,
  adminController.createManagerProfile,
);

adminRouter.patch(
  "/update-managerWork-status/",
  adminController.updateManagerWorkStatus,
);

adminRouter.post(
  "/create-warehouse",
  adminMiddlware.validateCreateWarehouseRequest,
  adminController.createWarehouseProfile,
);

adminRouter.get("/warehouses", adminController.getWarehouseList);

adminRouter.get("/warehouse/:state", adminController.getWarehousebyState);

adminRouter.patch(
  "/update-warehouse-status/",
  adminController.updateWarehouseStatus,
);

adminRouter.post(
  "/add-vehicle",
  upload.single("vehicleImg"),
  adminMiddlware.validateCreateVehicleRequest,
  adminController.addVehicle,
);

adminRouter.patch(
  "/update-vehicle-status/",
  adminController.updateVehicleStatus,
);

adminRouter.get("/get-stats", adminController.getStats);

export default adminRouter;
