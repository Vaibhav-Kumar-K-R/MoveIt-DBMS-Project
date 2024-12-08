import express from "express";

const customerRouter = express.Router();

customerRouter.get("/", (req, res) => {
  res.json({
    route: "Customer",
  });
});

export default customerRouter;
