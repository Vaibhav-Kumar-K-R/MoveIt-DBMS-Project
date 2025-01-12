use("test");

// Find the vendors who have placed more than 2 orders and their names
db.getCollection("orders").aggregate([
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
        $gt: 2,
      },
    },
  },
  {
    $lookup: {
      from: "vendors",
      localField: "_id",
      foreignField: "_id",
      as: "vendorDetails",
    },
  },
  {
    $unwind: "$vendorDetails",
  },
  {
    $project: {
      vendorName: "$vendorDetails.name",
      totalOrders: 1,
    },
  },
]);
