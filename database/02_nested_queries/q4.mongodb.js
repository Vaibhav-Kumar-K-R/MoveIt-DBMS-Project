use("test");

// Find all the trackings for the warehouse with id 67778cc8ea7635b91f18770b
db.trackings.find({
  warehouse: db.warehouses.findOne({
    _id: ObjectId("67778cc8ea7635b91f18770b"),
  })._id,
});
