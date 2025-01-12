use("test");

// Find all the employees who don't have a profile image
db.employees.find({
  "profile_img.profile_img_url": {
    $not: {
      $regex: /default-user.png/,
      $exists: false,
    },
  },
});
