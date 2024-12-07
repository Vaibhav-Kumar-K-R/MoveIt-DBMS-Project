import express from "express";

const adminRouter = express.Router();

adminRouter.get("/", (req, res) => {
  res.json({
    route: "Admin",
  });
});

export default adminRouter;
