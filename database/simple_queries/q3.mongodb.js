use("test");

db.vendors.find({
	city: {
		$regex: /kundapura/i,
	},
});
