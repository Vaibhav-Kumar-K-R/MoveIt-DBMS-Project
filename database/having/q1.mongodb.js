use("test");

db.employees.aggregate([
	{
		$group: {
			_id: "$city",
			totalEmployees: { $sum: 1 },
		},
	},
	{
		$match: {
			totalEmployees: { $gt: 1 },
		},
	},
]);
