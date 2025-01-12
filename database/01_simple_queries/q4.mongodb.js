use("test");

// Find all the orders placed on 2025-01-03
db.orders.find({
  order_placed_date: ISODate("2025-01-03T18:04:55.000+00:00"),
});
