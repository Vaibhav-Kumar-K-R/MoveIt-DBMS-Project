import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    tracking_id: {
      type: String,
      unique: true,
      required: true,
    },
    shipping_id: {
      type: String,
      unique: true,
      required: true,
    },
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product_img_url: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    order_placed_date: {
      type: Date,
      default: Date.now,
    },
    order_delivered_date: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: [
        "placed",
        "in_transit",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      required: true,
      default: "placed",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
