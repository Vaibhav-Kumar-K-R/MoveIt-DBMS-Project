import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/me", authController.getAuthStatus);

export default authRouter;
