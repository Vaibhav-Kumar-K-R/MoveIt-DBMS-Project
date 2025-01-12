use("test");

// Find all the orders placed between 2025-01-01 and 2025-01-08
db.orders.find({
  order_placed_date: {
    $gte: ISODate("2025-01-01"),
    $lte: ISODate("2025-01-08"),
  },
});
