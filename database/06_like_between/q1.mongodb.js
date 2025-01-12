use("test");

// Find all the employees whose name starts with P or p
db.employees.find({
  name: {
    $regex: /^p/i,
  },
});
