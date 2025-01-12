use("test");

// Find all the orders with total price greater than 1000 and status is placed
db.orders.find({
  "price_details.total_price": {
    $gt: 1000,
  },
  status: "placed",
});
