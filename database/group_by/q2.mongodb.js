use("test");

db.orders.aggregate([
	{
		$group: {
			_id: "$vendor",
			totalOrders: { $sum: 1 },
		},
	},
]);
