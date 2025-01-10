use("test");

db.vendors.find({
	"profile_img.public_id": { $not: { $exists: true } },
});
