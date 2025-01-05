import express from "express";
import managersController from "../controllers/managers.controller.js";
import managerValidateMiddleware from "../middlewares/manager-validate.middleware.js";
import managerAuthMiddleware from "../middlewares/manager-auth.middleware.js";
import upload from "../config/multer.js";

const managerRouter = express.Router();

managerRouter.post(
  "/auth/sign-in",
  managerValidateMiddleware.validateManagerSignInRequest,
  managersController.signInManager
);

managerRouter.post(
  "/add-employee",
  upload.single("employeeProfileImg"),
  managerAuthMiddleware.verifyManagerToken,
  managerValidateMiddleware.validateAddEmployeeRequest,
  managersController.addEmployee
);

managerRouter.use(managerAuthMiddleware.verifyManagerToken);

managerRouter.get("/me", managersController.getManager);

managerRouter.post("/auth/sign-out", managersController.signOutManager);

managerRouter.get(
  "/get-employees",
  managersController.getEmployeesUnderManager
);

managerRouter.delete(
  "/remove-employee/:employeeId",
  managersController.removeEmployee
);

export default managerRouter;
