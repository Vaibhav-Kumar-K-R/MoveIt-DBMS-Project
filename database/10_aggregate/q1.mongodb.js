use("test");

// Find the average price for each vendor
db.orders.aggregate([
  {
    $group: {
      _id: "$vendor",
      avg_price: {
        $avg: "$price_details.product_price",
      },
    },
  },
]);
