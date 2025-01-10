use("test");

db.employees.aggregate([
	{
		$match: {
			city: {
				$regex: /bangalore/i,
			},
		},
	},
	{
		$unionWith: {
			coll: "employees",
			pipeline: [
				{
					$match: {
						city: {
							$regex: /belagavi/i,
						},
					},
				},
			],
		},
	},
]);
