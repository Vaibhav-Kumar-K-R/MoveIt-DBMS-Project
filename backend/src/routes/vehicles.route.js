import express from "express";
import Vehicle from "../models/vehicle.model.js";

const router = express.Router();

router.get("/all-vehicles", async (_req, res) => {
  const vehicles = await Vehicle.find({}).select("-__v");

  res.status(200).json({ vehicles });
});

export default router;
