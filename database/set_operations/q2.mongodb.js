use("test");

db.vendors.aggregate([
	{
		$lookup: {
			from: "managers",
			localField: "city",
			foreignField: "city",
			as: "matching_managers",
		},
	},
	{
		$match: {
			matching_managers: { $ne: [] },
		},
	},
]);
