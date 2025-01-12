use("test");

// Find all the vendors who don't have a profile image
db.vendors.find({
  "profile_img.public_id": {
    $not: {
      $exists: true,
    },
  },
});
