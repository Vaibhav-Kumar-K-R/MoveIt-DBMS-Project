import express from "express";

const employeeRouter = express.Router();

employeeRouter.get("/", (req, res) => {
  res.json({
    route: "Employee",
  });
});

export default employeeRouter;
