use("test");

// Find the vendors who have placed more than 2 orders
db.orders.aggregate([
  {
    $group: {
      _id: "$vendor",
      totalOrders: {
        $sum: 1,
      },
    },
  },
  {
    $match: {
      totalOrders: {
        $gte: 2,
      },
    },
  },
]);
