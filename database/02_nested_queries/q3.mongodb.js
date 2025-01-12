use("test");

// Find all the orders placed by vendors from Udupi
db.orders.find({
  vendor: {
    $in: db.vendors
      .find({
        city: {
          $regex: /udupi/i,
        },
      })
      .toArray()
      .map((v) => v._id),
  },
});
