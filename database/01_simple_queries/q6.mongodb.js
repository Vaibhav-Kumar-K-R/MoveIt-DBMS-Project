use("test");

// Find all the employees whose manager id is 6778012a813a73f0f446b142 and city is belagavi
db.employees.find(
  {
    $and: [
      {
        manager: ObjectId("6778012a813a73f0f446b142"),
      },
      {
        city: /belagavi/i,
      },
    ],
  },
  {
    password: 0,
  }
);
