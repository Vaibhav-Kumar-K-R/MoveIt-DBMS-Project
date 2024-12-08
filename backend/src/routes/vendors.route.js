import express from "express";
import VendorController from "../controllers/vendors.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/auth/sign-up", VendorController.signUpVendor);

vendorRouter.post("/auth/sign-in", VendorController.signInVendor);

export default vendorRouter;
