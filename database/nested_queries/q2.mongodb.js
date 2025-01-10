use("test");

db.orders.find({
	vendor: ObjectId("6773a0851e8303b345272b8c"),
	warehouse: ObjectId("67778cc8ea7635b91f18770b"),
});
