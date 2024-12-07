import express from "express";
import VendorController from "../controllers/vendors.controller.js";

const vendorRouter = express.Router();

vendorRouter.post("/auth/sign-up", VendorController.signUpVendor);

export default vendorRouter;
