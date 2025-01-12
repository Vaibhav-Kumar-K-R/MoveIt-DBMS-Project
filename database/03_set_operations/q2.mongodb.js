use("test");

// Find all the vendors from a city that has a manager
db.vendors.aggregate([
  {
    $lookup: {
      from: "managers",
      localField: "city",
      foreignField: "city",
      as: "matching_managers",
    },
  },
  {
    $match: {
      matching_managers: { $ne: [] },
    },
  },
]);
