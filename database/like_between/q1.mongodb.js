use("test");

db.employees.find({
	name: { $regex: /^p/i },
});
