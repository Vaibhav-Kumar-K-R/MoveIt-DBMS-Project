import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    number_plate: { type: String, required: true, unique: true },
    curr_status: {
      type: String,
      enum: ["available", "in_use", "in_maintenance", "not_available"],
      default: "available",
    },
    capacity: { type: Number, required: true },
    vehicle_img: {
      vehicle_img_url: { type: String, required: true },
      public_id: { type: String },
    },
    model: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
