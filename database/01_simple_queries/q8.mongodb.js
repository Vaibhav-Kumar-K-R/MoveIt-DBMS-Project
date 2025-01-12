use("test");

// Find all the employees whose role is driver and driving experience is greater than 5
db.employees.find(
  {
    $and: [
      {
        role: "driver",
      },
      {
        driving_experience: {
          $gt: 5,
        },
      },
    ],
  },
  {
    password: 0,
  }
);
