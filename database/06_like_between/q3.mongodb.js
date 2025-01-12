use("test");

// Find all the vendors whose shop name contains the word "world"
db.vendors.find({
  shop_name: {
    $regex: /world/i,
  },
});
