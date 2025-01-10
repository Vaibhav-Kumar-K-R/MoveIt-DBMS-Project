use("test");

db.managers.find({
	salary: { $gt: 50000 },
});
