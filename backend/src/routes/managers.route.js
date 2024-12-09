import express from "express";
import managersController from "../controllers/managers.controller.js";
import managerValidateMiddleware from "../middlewares/manager-validate.middleware.js";
import managerAuthMiddleware from "../middlewares/manager-auth.middleware.js";
import upload from "../config/multer.js";

const managerRouter = express.Router();

managerRouter.get(
  "/get-employees",
  managerAuthMiddleware.verifyManagerToken,
  managersController.getEmployeesUnderManager,
);

managerRouter.post(
  "/auth/sign-in",
  managerValidateMiddleware.validateManagerSignInRequest,
  managersController.signInManager,
);

managerRouter.post(
  "/add-employee",
  upload.single("employeeProfileImg"),
  managerAuthMiddleware.verifyManagerToken,
  managerValidateMiddleware.validateAddEmployeeRequest,
  managersController.addEmployee,
);

managerRouter.delete(
  "/remove-employee/:employeeId",
  managerAuthMiddleware.verifyManagerToken,
  managersController.removeEmployee,
);

export default managerRouter;
