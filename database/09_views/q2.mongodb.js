use("test");

// Create a view to list all the orders placed from Udupi
db.createView("orders_from_udupi", "orders", [
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
        $regex: /udupi/i,
      },
    },
  },
  {
    $project: {
      vendorDetail: 0,
    },
  },
]);
