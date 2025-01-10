use('test');

db.orders.find({
  "price_details.total_price": { $gt: 1000 },
  status: "placed"
});
