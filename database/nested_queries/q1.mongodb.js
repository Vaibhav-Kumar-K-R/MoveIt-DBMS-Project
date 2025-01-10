use("test");

db.employees.find({
  manager: ObjectId("6778012a813a73f0f446b142"),
  city: /belagavi/i,
});
