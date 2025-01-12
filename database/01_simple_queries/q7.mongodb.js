use("test");

// Find all the order placed by vendor with id 6773a0851e8303b345272b8c or the nearest warehouse with id 67778cc8ea7635b91f18770b
db.orders.find({
  $or: [
    {
      vendor: ObjectId("6773a0851e8303b345272b8c"),
    },
    {
      warehouse: ObjectId("67778cc8ea7635b91f18770b"),
    },
  ],
});
