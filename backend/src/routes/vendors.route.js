import express from "express";
import vendorsController from "../controllers/vendors.controller.js";
import vendorAuthMiddleware from "../middlewares/vendor-auth.middleware.js";
import vendorValidateMiddleware from "../middlewares/vendor-validate.middleware.js";
import upload from "../config/multer.js";

const vendorRouter = express.Router();

vendorRouter.post(
  "/auth/sign-up",
  vendorValidateMiddleware.validateVendorSignUpRequest,
  vendorsController.signUpVendor
);

vendorRouter.post(
  "/auth/sign-in",
  vendorValidateMiddleware.validateVendorSignInRequest,
  vendorsController.signInVendor
);

vendorRouter.use(vendorAuthMiddleware.verifyVendorToken);

vendorRouter.get("/me", vendorsController.getVendor);

vendorRouter.get("/recent-orders", vendorsController.getRecentOrders);

vendorRouter.post("/auth/sign-out", vendorsController.signOutVendor);

vendorRouter.post(
  "/create-order",
  vendorValidateMiddleware.validateCreateOrderRequest,
  vendorsController.createOrder
);

vendorRouter.patch("/cancel-order/:shippingId", vendorsController.cancelOrder);

vendorRouter.put(
  "/update-profile",
  upload.single("profileImage"),
  vendorValidateMiddleware.validateUpdateProfileRequest,
  vendorsController.updateProfile
);

export default vendorRouter;
