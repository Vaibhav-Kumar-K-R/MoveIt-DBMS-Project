use("test");

db.vendors.find({
	shop_name: { $regex: /world/i },
});
