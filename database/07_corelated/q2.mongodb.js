use("test");

// Find the vendor who has the highest average price
db.orders.aggregate([
  {
    $group: {
      _id: "$vendor",
      avg_price: {
        $avg: "$price_details.product_price",
      },
    },
  },
  {
    $sort: {
      avg_price: -1,
    },
  },
  {
    $limit: 1,
  },
]);
