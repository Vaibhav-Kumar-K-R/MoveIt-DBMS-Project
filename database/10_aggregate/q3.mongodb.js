use("test");

// Find the total number of orders placed by each vendor
db.orders.aggregate([
  {
    $group: {
      _id: "$vendor",
      order_count: {
        $sum: 1,
      },
    },
  },
]);
