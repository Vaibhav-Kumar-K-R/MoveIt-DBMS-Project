import express from "express";

const warehouseRouter = express.Router();

warehouseRouter.get("/", (req, res) => {
  res.json({
    route: "Warehouse",
  });
});

export default warehouseRouter;
