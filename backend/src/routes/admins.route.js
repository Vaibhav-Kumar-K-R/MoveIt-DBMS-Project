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

adminRouter.post(
  "/create-warehouse",
  upload.single("warehouseProfileImg"),
  adminAuthMiddleware.verifyAdminToken,
  adminMiddlware.validateCreateWarehouseRequest,
  adminController.createWarehouseProfile,
);

adminRouter.use(adminAuthMiddleware.verifyAdminToken);

adminRouter.get("/me", adminController.getAdmin);

adminRouter.post("/auth/sign-out", adminController.signOutAdmin);

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

adminRouter.get("/warehouses", adminController.getWarehouseList);

adminRouter.get("/warehouse/:state", adminController.getWarehousebyState);

adminRouter.get(
  "/warehouseManagerList",
  adminController.getCreateWarehouseManagersList,
);

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
