import express from "express";
import VendorController from "../controllers/vendors.controller.js";
import vendorAuthMiddleware from "../middlewares/vendor-auth.middleware.js";
import vendorValidateMiddleware from "../middlewares/vendor-validate.middleware.js";

const vendorRouter = express.Router();

vendorRouter.post(
  "/auth/sign-up",
  vendorValidateMiddleware.validateVendorSignUpRequest,
  VendorController.signUpVendor,
);

vendorRouter.post(
  "/auth/sign-in",
  vendorValidateMiddleware.validateSignInRequest,
  VendorController.signInVendor,
);

vendorRouter.post(
  "/create-order",
  vendorAuthMiddleware.verifyVendorToken,
  vendorValidateMiddleware.validateCreateOrderRequest,
  VendorController.createOrder,
);

export default vendorRouter;
