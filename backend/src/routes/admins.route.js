import express from "express";
import adminMiddlware from "../middlewares/admin-validate.middleware.js";
import adminController from "../controllers/admins.controller.js";
import verifyAdminToken from "../middlewares/admin-auth.middleware.js";
import upload from "../config/multer.js";
const adminRouter = express.Router();

adminRouter.post(
  "/sign-in",
  adminMiddlware.validateAdminSignInRequest,
  adminController.signInAdmin,
);

adminRouter.post(
  "/create-manager",
  upload.single("managerProfileImg"),
  verifyAdminToken,
  adminMiddlware.validateCreateManagerRequest,
  adminController.createManagerProfile,
);

export default adminRouter;
