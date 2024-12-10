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
  "/create-manager",
  upload.single("managerProfileImg"),
  adminAuthMiddleware.verifyAdminToken,
  adminMiddlware.validateCreateManagerRequest,
  adminController.createManagerProfile,
);

adminRouter.post(
  "/create-warehouse",
  adminAuthMiddleware.verifyAdminToken,
  adminMiddlware.validateCreateWarehouseRequest,
  adminController.createWarehouseProfile,
);

adminRouter.get(
  "/warehouses",
  adminAuthMiddleware.verifyAdminToken,
  adminController.getWarehouseList,
);

adminRouter.get(
  "/warehouse/:state",
  adminAuthMiddleware.verifyAdminToken,
  adminController.getWarehousebyState,
);

export default adminRouter;
