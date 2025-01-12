use("test");

// Find the total weight of all the orders placed by vendors from Udupi
db.orders.aggregate([
  {
    $lookup: {
      from: "vendors",
      localField: "vendor",
      foreignField: "_id",
      as: "vendorDetails",
    },
  },
  {
    $unwind: "$vendorDetails",
  },
  {
    $match: {
      "vendorDetails.city": {
        $regex: /udupi/i,
      },
    },
  },
  {
    $group: {
      _id: null,
      totalWeight: {
        $sum: "$weight",
      },
    },
  },
]);
