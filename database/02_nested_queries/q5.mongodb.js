use("test");

// Find the vendor who has placed an order with tracking id TRACKING_af407cd6
db.vendors.find({
  _id: db.orders.findOne({
    tracking_id: "TRACKING_af407cd6",
  }).vendor,
});
