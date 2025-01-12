use("test");

// Find all the vehicles that are currently in use
db.vehicles.find({
  curr_status: "in_use",
});
