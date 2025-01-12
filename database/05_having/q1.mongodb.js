use("test");

// Find all the cities that have more than 1 employee
db.employees.aggregate([
  {
    $group: {
      _id: "$city",
      totalEmployees: {
        $sum: 1,
      },
    },
  },
  {
    $match: {
      totalEmployees: {
        $gt: 1,
      },
    },
  },
]);
