import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    number_plate: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "in_use", "in_maintenance"],
      default: "available",
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicle_img_url: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
