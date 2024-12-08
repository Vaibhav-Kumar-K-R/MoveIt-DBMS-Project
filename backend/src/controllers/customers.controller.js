import Order from "../models/order.model.js";

const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      tracking_id: req.params.trackingId,
    }).populate({
      path: "vendor_id",
      select: "-password",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export default {
  getOrder,
};
