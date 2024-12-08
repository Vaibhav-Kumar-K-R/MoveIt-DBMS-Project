import express from "express";
import customersController from "../controllers/customers.controller.js";

const customerRouter = express.Router();

customerRouter.get("/get-order/:trackingId", customersController.getOrder);

export default customerRouter;
