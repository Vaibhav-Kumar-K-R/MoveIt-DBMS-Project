import Tracking from "../models/tracking.model.js";
import Order from "../models/order.model.js";

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      tracking_id: req.params.trackingId,
    }).populate({
      path: "vendor",
      select: "-password -__v",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const tracking = await Tracking.find({
      order: order._id,
      isVerified: true,
    })
      .select("-__v")
      .populate({
        path: "warehouse",
        select: "name city state address pincode",
      })
      .sort({
        arrival_datetime: -1,
      });

    return res.status(200).json({
      order,
      tracking,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getOrder,
};
