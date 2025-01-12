use("test");

// Get all the orders placed from udupi or kundapura
db.orders.aggregate([
  {
    $lookup: {
      from: "vendors",
      localField: "vendor",
      foreignField: "_id",
      as: "vendorDetail",
    },
  },
  {
    $unwind: "$vendorDetail",
  },
  {
    $match: {
      "vendorDetail.city": {
        $regex: /udupi|kundapura/i,
      },
    },
  },
  {
    $project: {
      vendorDetail: 0,
    },
  },
]);
