import mongoose from "mongoose";

const orderStopSchema = new mongoose.Schema(
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
    arrival_datetime: {
      type: Date,
      default: null,
    },
    departure_datetime: {
      type: Date,
      default: null,
    },
    driver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  { timestamps: true },
);

const OrderStop = mongoose.model("OrderStop", orderStopSchema);

export default OrderStop;
