import mongoose from "mongoose";

const tracking = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    warehouse_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    vehicle_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    status: {
      type: String,
      enum: ["arrived", "departed", "out_for_delivery"],
      default: "arrived",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Tracking = mongoose.model("Tracking", tracking);

export default Tracking;
