use("test");

// Find all the employees whose manager id is 6756fde5c719bda2bc10b5d8
db.employees.find({
  manager: ObjectId("6756fde5c719bda2bc10b5d8"),
});
