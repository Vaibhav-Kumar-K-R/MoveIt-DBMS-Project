import express from "express";
import adminMiddlware from "../middlewares/admin-validate.middleware.js"
import adminController from "../controllers/admins.controller.js"
const adminRouter = express.Router();
  
adminRouter.post("/sign-in",adminMiddlware.validateAdminSignInRequest,adminController.signInAdmin)

export default adminRouter;
 