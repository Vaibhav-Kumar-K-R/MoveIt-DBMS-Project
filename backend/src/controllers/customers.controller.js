import OrderStop from "../models/order-stop.model.js";
import Order from "../models/order.model.js";

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      tracking_id: req.params.trackingId,
    }).populate({
      path: "vendor_id",
      select: "-password -__v",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const orderStops = await OrderStop.find({
      order_id: order._id,
      isVerified: true,
    })
      .select("-__v")
      .populate({
        path: "warehouse_id",
        select: "name city state address pincode",
      })
      .sort({
        arrival_datetime: -1,
      });

    return res.status(200).json({
      order,
      tracking: orderStops,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getOrder,
};
