use("test");

// Find all the vendors who have placed orders worth more than 10000
const vendorIds = db.orders
  .find(
    {
      "price_details.total_price": {
        $gt: 10_000,
      },
    },
    {
      vendor: 1,
    }
  )
  .toArray();

db.vendors.find({
  _id: {
    $in: vendorIds.map((order) => order.vendor),
  },
});
