use("test");

// Find the total number of employees in each city
db.employees.aggregate([
  {
    $group: {
      _id: "$city",
      totalEmployees: {
        $sum: 1,
      },
    },
  },
]);
