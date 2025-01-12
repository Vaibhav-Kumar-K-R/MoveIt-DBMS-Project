use("test");

// Find all the employees whose manager is from Bangalore
const managers = db.managers
  .find(
    {
      city: {
        $regex: /bangalore/i,
      },
    },
    {
      _id: 1,
    }
  )
  .toArray();

db.employees.find({
  manager: {
    $in: managers.map((manager) => manager._id),
  },
});
