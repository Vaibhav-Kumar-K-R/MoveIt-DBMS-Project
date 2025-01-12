use("test");

// Find all the managers with a salary greater than 50000
db.managers.find({
  salary: {
    $gt: 50000,
  },
});
