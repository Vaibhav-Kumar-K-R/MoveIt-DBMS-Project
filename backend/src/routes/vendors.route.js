import express from "express";

const vendorRouter = express.Router();

vendorRouter.get("/", (req, res) => {
  res.json({
    route: "Vendor",
  });
});

export default vendorRouter;
