use("test");

db.orders.find({
	order_placed_date: {
		$gte: ISODate("2025-01-01"),
		$lte: ISODate("2025-01-08"),
	},
});
