use("test");

// Find all the employees from Bangalore and Belagavi
db.employees.aggregate([
  {
    $match: {
      city: {
        $regex: /bangalore/i,
      },
    },
  },
  {
    $unionWith: {
      coll: "employees",
      pipeline: [
        {
          $match: {
            city: {
              $regex: /belagavi/i,
            },
          },
        },
      ],
    },
  },
]);
